import { err, ok, Result } from "neverthrow";

export class SourceValidationManager {
  /**
   * Validates the provided GeoJSON data for a map layer.
   * @param data - The GeoJSON data to validate.
   * @returns A boolean indicating whether the data is valid.
   */
  validateGeoJSONSource(data: GeoJSON.FeatureCollection): Result<void, string> {
    if (!data || !data.type || data.type !== "FeatureCollection") {
      return err("Invalid GeoJSON data: Missing or incorrect type.");
    }
    if (!Array.isArray(data.features)) {
      return err("Invalid GeoJSON data: Features should be an array.");
    }
    return ok();
  }
}
