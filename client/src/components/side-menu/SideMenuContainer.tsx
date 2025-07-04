import { SideMenuToggleProvider } from "./helpers/contexts/SideMenuToggleContext";
import { ActiveTabProvider } from "./helpers/contexts/ActiveSideMenuTabContext";
import SideMenu from "./SideMenu";

export default function SideMenuContainer() {
  return (
    <ActiveTabProvider>
      <SideMenuToggleProvider>
        <SideMenu />
      </SideMenuToggleProvider>
    </ActiveTabProvider>
  );
}
