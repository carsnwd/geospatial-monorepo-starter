import { GMSButton, GMSSearchBar, IconFilter } from "ui";
import AddMapLayerModal from "./helpers/AddMapLayerModal";

export default function MapLayersMenu() {
  return (
    <div className="flex flex-col">
      <GMSSearchBar placeholder="Search map layers..." />
      <div className="flex flex-row-reverse gap-2 mt-4 mb-4">
        <GMSButton label="Filter" style="soft" icon={IconFilter} />
        <AddMapLayerModal />
      </div>
    </div>
  );
}
