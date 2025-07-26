import { LayerSpecification } from "maplibre-gl";

export type MapLayerTypes = "geojson"; // future "vector-tile" | "raster-tile" | "image" | "video" | "kml" | "gpx" | "wms" | "wmts" | "shape";
export type MapDataTypes = GeoJSON.FeatureCollection; // future VectorTile | RasterTile | Image | Video | KML | GPX | WMS | WMTS | Shape;

// style types
export type MapLayerCircleStyle = Extract<
  LayerSpecification,
  { type: "circle" }
>;
export type MapLayerLineStyle = Extract<LayerSpecification, { type: "line" }>;
export type MapLayerFillStyle = Extract<LayerSpecification, { type: "fill" }>;
export type MapLayerSymbolStyle = Extract<
  LayerSpecification,
  { type: "symbol" }
>;
export type MapLayerRasterStyle = Extract<
  LayerSpecification,
  { type: "raster" }
>;
export type MapLayerHeatmapStyle = Extract<
  LayerSpecification,
  { type: "heatmap" }
>;
export type MapLayerFillExtrusionStyle = Extract<
  LayerSpecification,
  { type: "fill-extrusion" }
>;
export type MapLayerHillshadeStyle = Extract<
  LayerSpecification,
  { type: "hillshade" }
>;
export type MapLayerBackgroundStyle = Extract<
  LayerSpecification,
  { type: "background" }
>;
export type MapLayerStyle =
  | MapLayerCircleStyle
  | MapLayerLineStyle
  | MapLayerFillStyle
  | MapLayerSymbolStyle
  | MapLayerRasterStyle
  | MapLayerHeatmapStyle
  | MapLayerFillExtrusionStyle
  | MapLayerHillshadeStyle
  | MapLayerBackgroundStyle;
