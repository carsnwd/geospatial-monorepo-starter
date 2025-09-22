/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { GeoJSONSourceFactory } from './GeoJSONSourceFactory';
import { SourceValidationManager } from '../../source-validation-manager/SourceValidationManager';
import { mock, describe, beforeEach, expect, it } from 'bun:test';

describe('GeoJSONSourceFactory', () => {
  let factory: GeoJSONSourceFactory;
  let mockValidateGeoJSONSource: ReturnType<typeof mock>;

  beforeEach(() => {
    mockValidateGeoJSONSource = mock();
    const mockSourceValidationManager = {
      validateGeoJSONSource: mockValidateGeoJSONSource
    } as SourceValidationManager;
    
    factory = new GeoJSONSourceFactory(mockSourceValidationManager);
  });
  
  describe('createSource', () => {
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

    it('should create a valid GeoJSON source when validation passes', () => {
      const sourceId = 'test-source';
      mockValidateGeoJSONSource.mockReturnValue({ isErr: () => false } as any);

      const result = factory.createSource(validGeoJSON, sourceId);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.sourceId).toBe(sourceId);
        expect(result.value.source.type).toBe('geojson');
        expect((result.value.source as any).data).toBe(validGeoJSON);
      }
    });

    it('should return error when validation fails', () => {
      const sourceId = 'test-source';
      const validationError = new Error('Invalid GeoJSON');
      mockValidateGeoJSONSource.mockReturnValue({
        isErr: () => true,
        error: validationError
      } as any);

      const result = factory.createSource(validGeoJSON, sourceId);

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        // @ts-ignore
        expect(result.error).toBe(validationError);
      }
    });

    it('should call validation manager with correct data', () => {
      const sourceId = 'test-source';
      mockValidateGeoJSONSource.mockReturnValue({ isErr: () => false } as any);

      factory.createSource(validGeoJSON, sourceId);

      expect(mockValidateGeoJSONSource).toHaveBeenCalledWith(validGeoJSON);
      expect(mockValidateGeoJSONSource).toHaveBeenCalledTimes(1);
    });

    it('should handle empty FeatureCollection', () => {
      const emptyGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
      };
      const sourceId = 'empty-source';
      mockValidateGeoJSONSource.mockReturnValue({ isErr: () => false } as any);

      const result = factory.createSource(emptyGeoJSON, sourceId);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect((result.value.source as any).data).toBe(emptyGeoJSON);
      }
    });
  });
});