import { Map as MapLibreMap } from "maplibre-gl";
import type { MapInstanceOptions } from "./types";

// Default style
const DEFAULT_STYLE = "https://demotiles.maplibre.org/style.json";

export class MapInstance {
  private map: MapLibreMap;

  constructor(options: MapInstanceOptions) {
    const mapOptions = {
      container: options.container,
      style: options?.style ?? DEFAULT_STYLE,
      center: options.center || [0, 0],
      zoom: options?.zoom ?? 2,
    };
    this.map = new MapLibreMap(mapOptions);
  }

  destroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
