import { IconDraw, IconGeofence, IconLayers } from "../icons/icons";
import { useState } from "react";

export default function GMSSidePanelMenu({
  isOpen,
  toggleSideMenu,
}: {
  isOpen: boolean;
  toggleSideMenu: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string | null>("draw"); // Track the active tab
  const iconLayers = IconLayers({ iconSize: "medium" });
  const iconDraw = IconDraw({ iconSize: "medium" });
  const iconGeofence = IconGeofence({ iconSize: "medium" });
  const panelHeight = isOpen ? "h-11/12" : "h-[2.5rem]";
  const activateTab = (tab: string) => {
    if (!isOpen) {
      toggleSideMenu();
    }
    setActiveTab(tab);
  };

  return (
    <div
      className={`w-lg bg-base-200 shadow-lg z-10 overflow-hidden ${panelHeight}`}
    >
      <div className="tabs tabs-lift">
        {/* Layers Tab */}
        <label className="tab">
          <input
            type="radio"
            name="my_tabs_4"
            onChange={() => activateTab("layers")}
            checked={activeTab === "layers"}
          />
          <div className="flex flex-row items-center gap-2">
            {iconLayers}
            <span>Layers</span>
          </div>
        </label>
        {activeTab === "layers" && (
          <div className="tab-content bg-base-100 border-base-300 p-6 h-11/12">
            Layers Content
          </div>
        )}

        {/* Draw Tab */}
        <label className="tab">
          <input
            type="radio"
            name="my_tabs_4"
            onChange={() => activateTab("draw")}
            checked={activeTab === "draw"}
          />
          <div className="flex flex-row items-center gap-2">
            {iconDraw}
            <span>Draw</span>
          </div>
        </label>
        {activeTab === "draw" && (
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Draw Content
          </div>
        )}

        {/* Geofence Tab */}
        <label className="tab">
          <input
            type="radio"
            name="my_tabs_4"
            onChange={() => activateTab("geofence")}
            checked={activeTab === "geofence"}
          />
          <div className="flex flex-row items-center gap-2">
            {iconGeofence}
            <span>Geofence</span>
          </div>
        </label>
        {activeTab === "geofence" && (
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Geofence Content
          </div>
        )}
      </div>
    </div>
  );
}
