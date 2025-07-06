import { Map as MapLibreMap } from "maplibre-gl";
import { SourceManager } from "./source-manager/SourceManager";
import { MapDataTypes, MapLayerTypes } from "./source-manager/types";
import { err, ok, Result } from "neverthrow";

export class MapLayersManager {
  private map: MapLibreMap;
  private layerManager: any; // Placeholder for layer manager type
  private sourceManager: SourceManager; // Placeholder for source manager type

  constructor(map: MapLibreMap) {
    this.map = map;
    this.layerManager = null; // Initialize with a proper layer manager instance
    this.sourceManager = new SourceManager(this.map); // Initialize with a proper source manager instance
  }

  addMapLayer(type: MapLayerTypes, data: MapDataTypes): Result<void, string> {
    const addSourceResult = this.sourceManager.addSource(data);
    if (addSourceResult.isErr()) {
      return err(addSourceResult.error);
    }
    return ok();
    // parse styling info
    // add layer info
    // store layer info and source info with a map layer id and return the map layer id
  }
  removeMapLayer(mapLayerId: string): void {
    // find layer by id
    // find source by id
    // remove layer
    // remove source
  }
}
