import { GMSButton, IconDoubleChevronDown, IconDoubleChevronUp } from "ui";
import GMSSidePanelMenu from "ui/components/GMSSidePanelMenu/GMSSidePanelMenu";
import { useSideMenuToggle } from "../../contexts/SideMenuToggleContext";

export default function SideMenu() {
  const { isOpen, toggleMenu } = useSideMenuToggle();
  return (
    <div className="absolute top-0 left-0 m-5">
      <div className="flex flex-row">
        <GMSSidePanelMenu isOpen={isOpen} toggleSideMenu={toggleMenu} />
        <GMSButton
          styles="ml-1"
          mode="neutral"
          onClick={toggleMenu}
          icon={isOpen ? IconDoubleChevronUp : IconDoubleChevronDown}
        />
      </div>
    </div>
  );
}
