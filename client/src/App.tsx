import SideMenuContainer from "./components/side-menu/SideMenuContainer";
import { MapInstanceProvider } from "./contexts/MapInstanceProvider";

function App() {
  return (
    <div className="mx-auto flex flex-col gap-6 items-center justify-center">
      <MapInstanceProvider>
        <SideMenuContainer />
      </MapInstanceProvider>
    </div>
  );
}

export default App;
