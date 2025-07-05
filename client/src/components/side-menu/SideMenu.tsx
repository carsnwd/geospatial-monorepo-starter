import {
  GMSButton,
  IconDoubleChevronDown,
  IconDoubleChevronUp,
  IconLayers,
  IconSettings,
  IconTool,
} from "ui";
import { useSideMenuToggle } from "./helpers/contexts/SideMenuToggleContext";
import SideMenuTab from "./helpers/SideMenuTab";
import { useActiveTab } from "./helpers/contexts/ActiveSideMenuTabContext";
import MapLayersMenu from "../map-layers-menu/MapLayersMenu";

export default function SideMenu() {
  const { isOpen, toggleMenu } = useSideMenuToggle();
  const { activeTab } = useActiveTab();
  const iconLayers = IconLayers({ iconSize: "medium" });
  const iconSettings = IconSettings({ iconSize: "medium" });
  const iconTool = IconTool({ iconSize: "medium" });
  const panelHeight = isOpen ? "h-[90vh]" : "h-[2.5rem]";

  return (
    <div className="absolute top-0 left-0 m-5">
      <div className="flex flex-row">
        <div
          className={`flex flex-grow w-xl bg-base-200 shadow-lg z-10 overflow-hidden rounded ${panelHeight}`}
          style={{ transition: "height 0.25s ease-in-out" }}
        >
          <div className="flex flex-grow w-lg tabs tabs-border">
            <SideMenuTab
              sideMenuIcon={iconLayers}
              sideMenuTabTitle="Layers"
              sideMenuTabId="layers"
            >
              <MapLayersMenu />
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconSettings}
              sideMenuTabTitle="Settings"
              sideMenuTabId="settings"
            >
              Settings
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconTool}
              sideMenuTabTitle="Tools"
              sideMenuTabId="tools"
            >
              Tools Content
            </SideMenuTab>
            <GMSButton
              cssStyles="ml-auto"
              color="secondary"
              onClick={toggleMenu}
              disabled={activeTab === null}
              icon={isOpen ? IconDoubleChevronUp : IconDoubleChevronDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
