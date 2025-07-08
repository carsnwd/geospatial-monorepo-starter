import { Map as MapLibreMap } from "maplibre-gl";
import type { MapInstanceOptions } from "./types";
import { MapLayersManager } from "../map-layers-manager/MapLayersManager";

// Default style
const DEFAULT_STYLE = "https://demotiles.maplibre.org/style.json";

export class MapInstance {
  // this should never be exposed publicly. Expose a service or interface instead to it.
  // nothing outside of the map-library should have access to maplibre-gl directly.
  private map: MapLibreMap;

  public mapLayersManager: MapLayersManager;

  constructor(options: MapInstanceOptions) {
    const mapOptions = {
      container: options.container,
      style: options?.style ?? DEFAULT_STYLE,
      center: options.center || [0, 0],
      zoom: options?.zoom ?? 2,
    };
    this.map = new MapLibreMap(mapOptions);
    this.mapLayersManager = new MapLayersManager(this.map);
  }

  destroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
