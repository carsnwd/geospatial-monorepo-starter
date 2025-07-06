import { GeoJSONSourceSpecification } from "maplibre-gl";

export class GeoJSONSourceFactory {
  /**
   * Creates a GeoJSON source specification for MapLibre GL.
   * @param data - The GeoJSON data to be used as the source.
   * @returns A GeoJSON source specification.
   */
  createSource(data: GeoJSON.FeatureCollection): GeoJSONSourceSpecification {
    return {
      type: "geojson",
      data,
    };
  }
}
