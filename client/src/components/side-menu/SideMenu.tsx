import {
  GMSButton,
  IconDoubleChevronDown,
  IconDoubleChevronUp,
  IconDraw,
  IconGeofence,
  IconLayers,
} from "ui";
import { useSideMenuToggle } from "./helpers/contexts/SideMenuToggleContext";
import SideMenuTab from "./helpers/SideMenuTab";
import { useActiveTab } from "./helpers/contexts/ActiveSideMenuTabContext";

export default function SideMenu() {
  const { isOpen, toggleMenu } = useSideMenuToggle();
  const { activeTab } = useActiveTab();
  const iconLayers = IconLayers({ iconSize: "medium" });
  const iconDraw = IconDraw({ iconSize: "medium" });
  const iconGeofence = IconGeofence({ iconSize: "medium" });
  const panelHeight = isOpen ? "h-[90vh]" : "h-[2.5rem]";

  return (
    <div className="absolute top-0 left-0 m-5">
      <div className="flex flex-row">
        <div
          className={`w-lg bg-base-200 shadow-lg z-10 overflow-hidden ${panelHeight}`}
          style={{ transition: "height 0.25s ease-in-out" }}
        >
          <div className="tabs tabs-lift">
            <SideMenuTab
              sideMenuIcon={iconLayers}
              sideMenuTabTitle="Layers"
              sideMenuTabId="layers"
            >
              Layers Content
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconDraw}
              sideMenuTabTitle="Draw"
              sideMenuTabId="draw"
            >
              Draw Content
            </SideMenuTab>

            <SideMenuTab
              sideMenuIcon={iconGeofence}
              sideMenuTabTitle="Geofence"
              sideMenuTabId="geofence"
            >
              Geofence Content
            </SideMenuTab>
          </div>
        </div>
        <GMSButton
          styles="ml-1"
          mode="neutral"
          onClick={toggleMenu}
          disabled={activeTab === null}
          icon={isOpen ? IconDoubleChevronUp : IconDoubleChevronDown}
        />
      </div>
    </div>
  );
}
