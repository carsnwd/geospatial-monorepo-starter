// import { hcWithType } from 'server/dist/client'

import { MapInstanceProvider } from "./contexts/MapInstanceProvider";
import { GMSButton, IconLayers } from "ui";

// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

// type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

// const client = hcWithType(SERVER_URL);

function App() {
  // const [data, setData] = useState<Awaited<ReturnType<ResponseType["json"]>> | undefined>()

  // async function sendRequest() {
  //   try {
  //     const res = await client.hello.$get()
  //     if (!res.ok) {
  //       console.log("Error fetching data")
  //       return
  //     }
  //     const data = await res.json()
  //     setData(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
      <MapInstanceProvider>
        <GMSButton
          label="Test"
          size="medium"
          mode="secondary"
          icon={IconLayers}
        />
      </MapInstanceProvider>
    </div>
  );
}

export default App;
