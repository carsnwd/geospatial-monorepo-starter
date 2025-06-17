import { Hono } from "hono";
import { cors } from "hono/cors";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

export const app = new Hono().use(cors());

// Store points and their WebSocket connections
const points: Record<
  string,
  { location: { lat: number; lng: number }; interval?: NodeJS.Timeout }
> = {};

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

function createLocationUpdateInterval(id: string, ws: ServerWebSocket) {
  const point = points[id];
  if (!point) {
    console.error(`Point with ID ${id} not found`);
    return;
  }
  // Emit location updates every 5-20 seconds for this point
  const interval = setInterval(() => {
    console.log(`Updating location for point ${id}`);
    const point = points[id];
    if (!point) {
      clearInterval(interval);
      return;
    }

    // Update the location randomly
    const latChange = Math.random() * 0.018 - 0.009; // ~1-2 miles latitude
    const lngChange = Math.random() * 0.018 - 0.009; // ~1-2 miles longitude
    point.location.lat += latChange;
    point.location.lng += lngChange;
    console.log(
      `New location for point ${id}: ${point.location.lat}, ${point.location.lng}`
    );

    // Send the updated location to all connected clients
    ws.send(JSON.stringify({ id, location: point.location }));
  }, Math.random() * (3000 - 1000) + 1000);
  return interval;
}

// Route to create a new point
app.post("/create-point", async (c) => {
  console.log("Creating a new point");
  const id = crypto.randomUUID(); // Generate a unique ID for the point
  const location = { lat: 39.2904, lng: -76.6122 }; // Start at downtown Baltimore, MD

  // Initialize the point with its location and an empty set of clients
  points[id] = { location };

  return c.json({ id, location }, { status: 201 });
});

// Route to get the location of a specific point
app.get("/point/:id", (c) => {
  const id = c.req.param("id");
  console.log(`Fetching location for point ${id}`);
  const point = points[id];
  if (!point) {
    return c.text("Point not found", 404);
  }
  return c.json({ id, location: point.location });
});

// WebSocket route to listen to updates for a specific point
app.get(
  "/listen/:id",
  upgradeWebSocket((c) => {
    return {
      onClose: () => {
        const id = c.req.param("id");
        if (points[id] && points[id].interval) {
          points[id].interval && clearInterval(points[id].interval);
        }
        console.log(`WebSocket connection closed for point ${id}`);
      },
      onOpen: (event, ws) => {
        console.log(
          "WebSocket connection request for point:",
          c.req.param("id")
        );
        const id = c.req.param("id");

        if (!ws || !ws.raw || !points[id]) {
          console.error("Invalid WebSocket connection or point ID:", id);
          return c.text("Invalid WebSocket connection or point ID", 400);
        }

        points[id].interval = createLocationUpdateInterval(id, ws.raw);
      },
    };
  })
);

export default {
  fetch: app.fetch,
  websocket,
};
