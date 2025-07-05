import {
  GMSButton,
  IconDataSource,
  IconDoubleChevronDown,
  IconDoubleChevronUp,
  IconLayers,
  IconTool,
} from "ui";
import { GMSSearchBar } from "ui";
import { useSideMenuToggle } from "./helpers/contexts/SideMenuToggleContext";
import SideMenuTab from "./helpers/SideMenuTab";
import { useActiveTab } from "./helpers/contexts/ActiveSideMenuTabContext";

export default function SideMenu() {
  const { isOpen, toggleMenu } = useSideMenuToggle();
  const { activeTab } = useActiveTab();
  const iconLayers = IconLayers({ iconSize: "medium" });
  const iconDataSource = IconDataSource({ iconSize: "medium" });
  const iconTool = IconTool({ iconSize: "medium" });
  const panelHeight = isOpen ? "h-[90vh]" : "h-[2.5rem]";

  return (
    <div className="absolute top-0 left-0 m-5">
      <div className="flex flex-row">
        <div
          className={`flex flex-grow w-lg bg-base-200 shadow-lg z-10 overflow-hidden rounded ${panelHeight}`}
          style={{ transition: "height 0.25s ease-in-out" }}
        >
          <div className="flex flex-grow w-full tabs tabs-border">
            <SideMenuTab
              sideMenuIcon={iconLayers}
              sideMenuTabTitle="Map Layers"
              sideMenuTabId="layers"
            >
              <div className="w-full flex items-center">
                <GMSSearchBar />
              </div>
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconDataSource}
              sideMenuTabTitle="Data Sources"
              sideMenuTabId="draw"
            >
              Data Source
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconTool}
              sideMenuTabTitle="Map Tools"
              sideMenuTabId="geofence"
            >
              Tools Content
            </SideMenuTab>
            <GMSButton
              styles="ml-auto"
              mode="primary"
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
