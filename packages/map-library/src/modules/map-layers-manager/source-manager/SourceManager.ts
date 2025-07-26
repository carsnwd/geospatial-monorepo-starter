import { Map as MapLibreMap } from "maplibre-gl";
import { GeoJSONSourceFactory } from "./source-factories/GeoJSONSourceFactory";
import { err, ok, Result } from "neverthrow";
import { MapLayerTypes } from "./types";
import { SourceFactory } from "./source-factories/interface";

export class SourceManager {
  private map: MapLibreMap;
  private geoJSONSourceFactory: GeoJSONSourceFactory;
  constructor(map: MapLibreMap) {
    this.map = map;
    this.geoJSONSourceFactory = new GeoJSONSourceFactory();
  }

  private getSourceFactoryForType(
    type: MapLayerTypes,
  ): Result<SourceFactory, string> {
    switch (type) {
      case "geojson":
        return ok(this.geoJSONSourceFactory);
      // Add more source factories for other types as needed
      default:
        return err(`Unsupported source type: ${type}`);
    }
  }

  /**
   * Adds a source to the map.
   * @param sourceData - The data to be added as a source.
   * @returns The ID of the added source.
   */
  addSource(props: {
    type: MapLayerTypes;
    sourceData: GeoJSON.FeatureCollection;
    id: string;
  }): Result<string, string> {
    const { type, sourceData, id } = props;
    const sourceFactory = this.getSourceFactoryForType(type);

    if (sourceFactory.isErr()) {
      return err(sourceFactory.error);
    }

    const sourceResult = sourceFactory.value.createSource(sourceData, id);
    if (sourceResult.isErr()) {
      return err(sourceResult.error);
    }
    const { sourceId, source } = sourceResult.value;
    this.map.addSource(sourceId, source);
    return ok(sourceId);
  }

  /**
   * Removes a source from the map by its ID.
   * @param sourceId - The ID of the source to be removed.
   */
  removeSource(sourceId: string): void {
    // Logic to remove a source from the map
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
  }
}
