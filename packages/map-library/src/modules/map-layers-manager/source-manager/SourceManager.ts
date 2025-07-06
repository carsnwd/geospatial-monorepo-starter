import { Map as MapLibreMap } from "maplibre-gl";
import { GeoJSONSourceFactory } from "./source-factories/GeoJSONSourceFactory";
import { SourceValidationManager } from "./source-validation-manager/SourceValidationManager";
import { err, ok, Result } from "neverthrow";

export class SourceManager {
  private map: MapLibreMap;
  private geoJSONSourceFactory: GeoJSONSourceFactory;
  private sourceValidationManager: SourceValidationManager; // Placeholder for source validation manager type
  constructor(map: MapLibreMap) {
    this.map = map;
    this.geoJSONSourceFactory = new GeoJSONSourceFactory();
    this.sourceValidationManager = new SourceValidationManager();
  }

  /**
   * Adds a GeoJSON source to the map.
   * @param sourceData - The GeoJSON data to be added as a source.
   * @returns The ID of the added source.
   */
  addSource(sourceData: GeoJSON.FeatureCollection): Result<string, string> {
    const validationResult =
      this.sourceValidationManager.validateGeoJSONSource(sourceData);
    if (validationResult.isErr()) {
      return err(validationResult.error);
    }

    const sourceId = `geojson-source-${crypto.randomUUID().slice(0, 16)}`;
    // Logic to add a source to the map
    this.map.addSource(
      sourceId,
      this.geoJSONSourceFactory.createSource(sourceData),
    );
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
