import { SourceValidationManager } from "../source-validation-manager/SourceValidationManager";
import { err, ok } from "neverthrow";
import { SourceFactory, SourceFactoryResult } from "./interface";

export class GeoJSONSourceFactory implements SourceFactory {
  private sourceValidationManager: SourceValidationManager;

  constructor() {
    this.sourceValidationManager = new SourceValidationManager();
  }
  /**
   * Creates a GeoJSON source specification for MapLibre GL.
   * @param data - The GeoJSON data to be used as the source.
   * @returns A GeoJSON source specification.
   */
  createSource(data: GeoJSON.FeatureCollection): SourceFactoryResult {
    const validationResult =
      this.sourceValidationManager.validateGeoJSONSource(data);
    if (validationResult.isErr()) {
      return err(validationResult.error);
    }

    const sourceId = `geojson-source-${crypto.randomUUID().slice(0, 16)}`;
    return ok({
      sourceId,
      source: {
        type: "geojson" as const,
        data,
      },
    });
  }
}
