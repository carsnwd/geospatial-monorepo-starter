import { IconLayers } from "../icons/icons";

export default function GMSSidePanelMenu() {
  const iconLayers = IconLayers("medium");
  return (
    <ul className="menu menu-lg bg-base-200 rounded-box w-56 font-light">
      <li>
        <a href="">{iconLayers} Layers</a>
      </li>
      <li>Draw</li>
      <li>Measure</li>
      <li>Geo-Fence</li>
    </ul>
  );
}
