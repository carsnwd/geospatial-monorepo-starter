import { GMSButton, GMSSearchBar } from "ui";

export default function MapLayersMenu() {
  return (
    <div className="flex flex-col">
      <GMSSearchBar placeholder="Search map layers..." />
      <div className="flex flex-row gap-2 mt-4 mb-4">
        <GMSButton label="Filter" style="outline" />
        <GMSButton label="Add Layer" style="outline" />
      </div>
    </div>
  );
}
