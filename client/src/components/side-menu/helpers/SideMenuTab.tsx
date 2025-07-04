import React from "react";
import { useActiveTab } from "./contexts/ActiveSideMenuTabContext";
import { useSideMenuToggle } from "./contexts/SideMenuToggleContext";

interface SideMenuTabProps {
  sideMenuIcon: React.ReactNode;
  sideMenuTabTitle: string;
  sideMenuTabId: string;
  children: React.ReactNode;
}

export default function SideMenuTab({
  sideMenuIcon,
  sideMenuTabTitle,
  sideMenuTabId,
  children,
}: SideMenuTabProps) {
  const { isOpen, toggleMenu } = useSideMenuToggle();
  const { activeTab, setActiveTab } = useActiveTab();
  const activateTab = (tab: string | null) => {
    if (!isOpen) {
      toggleMenu();
    }
    setActiveTab(tab);
  };
  return (
    <>
      <label className="tab">
        <input
          type="radio"
          name="side_menu_tabs"
          onChange={() => activateTab(sideMenuTabId)}
          checked={activeTab === sideMenuTabId}
        />
        <div className="flex flex-row items-center gap-2">
          {sideMenuIcon}
          <span>{sideMenuTabTitle}</span>
        </div>
      </label>
      {activeTab === sideMenuTabId && (
        <div className="tab-content">
          <div className="bg-base-100 p-6 border-base-300">
            {sideMenuTabTitle}
          </div>
          <div className="p-6">{children}</div>
        </div>
      )}
    </>
  );
}
