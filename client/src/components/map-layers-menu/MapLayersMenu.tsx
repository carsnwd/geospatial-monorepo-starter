import { GMSButton, GMSSearchBar, IconAddLayer, IconFilter } from "ui";

export default function MapLayersMenu() {
  return (
    <div className="flex flex-col">
      <GMSSearchBar placeholder="Search map layers..." />
      <div className="flex flex-row-reverse gap-2 mt-4 mb-4">
        <GMSButton label="Filter" style="soft" icon={IconFilter} />
        <GMSButton label="Add Layer" style="soft" icon={IconAddLayer} />
      </div>
    </div>
  );
}
