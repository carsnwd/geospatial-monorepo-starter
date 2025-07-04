import SideMenu from "./components/side-menu/SideMenu";
import { MapInstanceProvider } from "./contexts/MapInstanceProvider";
import { SideMenuToggleProvider } from "./contexts/SideMenuToggleContext";

function App() {
  return (
    <div className="mx-auto flex flex-col gap-6 items-center justify-center">
      <MapInstanceProvider>
        <SideMenuToggleProvider>
          <SideMenu />
        </SideMenuToggleProvider>
      </MapInstanceProvider>
    </div>
  );
}

export default App;
