import { describe, it, expect, beforeEach } from 'bun:test';
import { SourceValidationManager } from './SourceValidationManager';

describe('SourceValidationManager', () => {
  let sourceValidationManager: SourceValidationManager;

  beforeEach(() => {
    sourceValidationManager = new SourceValidationManager();
  });

  describe('validateGeoJSONSource', () => {
    it('should return ok for valid GeoJSON FeatureCollection', () => {
      const validGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            },
            properties: {}
          }
        ]
      };

      const result = sourceValidationManager.validateGeoJSONSource(validGeoJSON);
      
      expect(result.isOk()).toBe(true);
    });

    it('should return ok for empty features array', () => {
      const validGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
      };

      const result = sourceValidationManager.validateGeoJSONSource(validGeoJSON);
      
      expect(result.isOk()).toBe(true);
    });

    it('should return error when data is null', () => {
      const result = sourceValidationManager.validateGeoJSONSource(null as any);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Missing or incorrect type.');
    });

    it('should return error when data is undefined', () => {
      const result = sourceValidationManager.validateGeoJSONSource(undefined as any);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Missing or incorrect type.');
    });

    it('should return error when type property is missing', () => {
      const invalidGeoJSON = {
        features: []
      } as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Missing or incorrect type.');
    });

    it('should return error when type is not "FeatureCollection"', () => {
      const invalidGeoJSON = {
        type: 'Feature',
        features: []
      } as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Missing or incorrect type.');
    });

    it('should return error when features property is missing', () => {
      const invalidGeoJSON = {
        type: 'FeatureCollection'
      } as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Features should be an array.');
    });

    it('should return error when features is not an array', () => {
      const invalidGeoJSON = {
        type: 'FeatureCollection',
        features: 'not an array'
      } as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Features should be an array.');
    });

    it('should return error when features is null', () => {
      const invalidGeoJSON = {
        type: 'FeatureCollection',
        features: null
      } as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Features should be an array.');
    });

    it('should return ok for FeatureCollection with multiple features', () => {
      const validGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            },
            properties: { name: 'Point 1' }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [[0, 0], [1, 1]]
            },
            properties: { name: 'Line 1' }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
            },
            properties: { name: 'Polygon 1' }
          }
        ]
      };

      const result = sourceValidationManager.validateGeoJSONSource(validGeoJSON);
      
      expect(result.isOk()).toBe(true);
    });

    it('should handle empty object', () => {
      const invalidGeoJSON = {} as any;

      const result = sourceValidationManager.validateGeoJSONSource(invalidGeoJSON);
      
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('Invalid GeoJSON data: Missing or incorrect type.');
    });
  });
});