import { Result } from "neverthrow";
import { MapDataTypes } from "../types";
import { SourceSpecification } from "maplibre-gl";

export type SourceFactoryResult = Result<
  { source: SourceSpecification; sourceId: string },
  string
>;

export interface SourceFactory {
  createSource(data: MapDataTypes, id: string): SourceFactoryResult;
}
