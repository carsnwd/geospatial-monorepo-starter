// biome-ignore-file lint/suspicious/noExplicitAny: Test file with mocking
import { describe, it, expect, beforeEach, mock } from 'bun:test';
import { SourceManager } from './SourceManager';
import { GeoJSONSourceFactory } from './source-factories/GeoJSONSourceFactory/GeoJSONSourceFactory';
import { Map as MapLibreMap } from 'maplibre-gl';
import { ok, err } from 'neverthrow';

// Mock the dependencies
const mockMap = {
  addSource: mock(),
  removeSource: mock(),
  getSource: mock()
} as unknown as MapLibreMap;

const mockGeoJSONSourceFactory = {
  createSource: mock()
} as unknown as GeoJSONSourceFactory;

// Mock the GeoJSONSourceFactory constructor
const mockGeoJSONSourceFactoryConstructor = mock(() => mockGeoJSONSourceFactory);

describe('SourceManager', () => {
  let sourceManager: SourceManager;

  beforeEach(() => {
    // Reset all mocks
    mockMap.addSource = mock();
    mockMap.removeSource = mock();
    mockMap.getSource = mock();
    mockGeoJSONSourceFactory.createSource = mock();
    
    // Create a new instance for each test
    sourceManager = new SourceManager(mockMap);
    // Replace the factory with our mock
    (sourceManager as any).geoJSONSourceFactory = mockGeoJSONSourceFactory;
  });

  describe('constructor', () => {
    it('should initialize with map and create GeoJSONSourceFactory', () => {
      const newManager = new SourceManager(mockMap);
      
      expect(newManager).toBeDefined();
      expect((newManager as any).map).toBe(mockMap);
      expect((newManager as any).geoJSONSourceFactory).toBeDefined();
    });
  });

  describe('addSource', () => {
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

    it('should successfully add a GeoJSON source when all validations pass', () => {
      const sourceId = 'test-source';
      const mockSource = { type: 'geojson', data: validGeoJSON };
      
      mockGeoJSONSourceFactory.createSource = mock(() => 
        ok({ sourceId, source: mockSource })
      );

      const result = sourceManager.addSource({
        type: 'geojson',
        sourceData: validGeoJSON,
        id: sourceId
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toBe(sourceId);
      }
      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalledWith(validGeoJSON, sourceId);
      expect(mockMap.addSource).toHaveBeenCalledWith(sourceId, mockSource);
    });

    it('should return error for unsupported source type', () => {
      const result = sourceManager.addSource({
        type: 'unsupported' as any,
        sourceData: validGeoJSON,
        id: 'test-source'
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBe('Unsupported source type: unsupported');
      }
      expect(mockGeoJSONSourceFactory.createSource).not.toHaveBeenCalled();
      expect(mockMap.addSource).not.toHaveBeenCalled();
    });

    it('should return error when source factory fails', () => {
      const sourceId = 'test-source';
      const factoryError = 'Invalid GeoJSON data';
      
      mockGeoJSONSourceFactory.createSource = mock(() => 
        err(factoryError)
      );

      const result = sourceManager.addSource({
        type: 'geojson',
        sourceData: validGeoJSON,
        id: sourceId
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBe(factoryError);
      }
      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalledWith(validGeoJSON, sourceId);
      expect(mockMap.addSource).not.toHaveBeenCalled();
    });

    it('should handle empty FeatureCollection', () => {
      const emptyGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
      };
      const sourceId = 'empty-source';
      const mockSource = { type: 'geojson', data: emptyGeoJSON };
      
      mockGeoJSONSourceFactory.createSource = mock(() => 
        ok({ sourceId, source: mockSource })
      );

      const result = sourceManager.addSource({
        type: 'geojson',
        sourceData: emptyGeoJSON,
        id: sourceId
      });

      expect(result.isOk()).toBe(true);
      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalledWith(emptyGeoJSON, sourceId);
      expect(mockMap.addSource).toHaveBeenCalledWith(sourceId, mockSource);
    });

    it('should call createSource and addSource with correct parameters', () => {
      const sourceId = 'detailed-test-source';
      const mockSource = { type: 'geojson', data: validGeoJSON };
      
      mockGeoJSONSourceFactory.createSource = mock(() => 
        ok({ sourceId, source: mockSource })
      );

      sourceManager.addSource({
        type: 'geojson',
        sourceData: validGeoJSON,
        id: sourceId
      });

      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalledTimes(1);
      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalledWith(validGeoJSON, sourceId);
      expect(mockMap.addSource).toHaveBeenCalledTimes(1);
      expect(mockMap.addSource).toHaveBeenCalledWith(sourceId, mockSource);
    });
  });

  describe('removeSource', () => {
    it('should remove existing source from map', () => {
      const sourceId = 'existing-source';
      mockMap.getSource = mock(() => ({ type: 'geojson' }));

      sourceManager.removeSource(sourceId);

      expect(mockMap.getSource).toHaveBeenCalledWith(sourceId);
      expect(mockMap.removeSource).toHaveBeenCalledWith(sourceId);
    });

    it('should not call removeSource when source does not exist', () => {
      const sourceId = 'non-existing-source';
      mockMap.getSource = mock(() => undefined);

      sourceManager.removeSource(sourceId);

      expect(mockMap.getSource).toHaveBeenCalledWith(sourceId);
      expect(mockMap.removeSource).not.toHaveBeenCalled();
    });

    it('should handle null source gracefully', () => {
      const sourceId = 'null-source';
      mockMap.getSource = mock(() => null);

      sourceManager.removeSource(sourceId);

      expect(mockMap.getSource).toHaveBeenCalledWith(sourceId);
      expect(mockMap.removeSource).not.toHaveBeenCalled();
    });

    it('should call getSource and removeSource with correct sourceId', () => {
      const sourceId = 'test-removal-source';
      mockMap.getSource = mock(() => ({ type: 'geojson' }));

      sourceManager.removeSource(sourceId);

      expect(mockMap.getSource).toHaveBeenCalledTimes(1);
      expect(mockMap.getSource).toHaveBeenCalledWith(sourceId);
      expect(mockMap.removeSource).toHaveBeenCalledTimes(1);
      expect(mockMap.removeSource).toHaveBeenCalledWith(sourceId);
    });
  });

  describe('getSourceFactoryForType (tested through addSource)', () => {
    it('should return GeoJSONSourceFactory for geojson type', () => {
      const validGeoJSON: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
      };
      
      mockGeoJSONSourceFactory.createSource = mock(() => 
        ok({ sourceId: 'test', source: { type: 'geojson', data: validGeoJSON } })
      );

      const result = sourceManager.addSource({
        type: 'geojson',
        sourceData: validGeoJSON,
        id: 'test'
      });

      expect(result.isOk()).toBe(true);
      expect(mockGeoJSONSourceFactory.createSource).toHaveBeenCalled();
    });

    it('should return error for unknown source type', () => {
      const result = sourceManager.addSource({
        type: 'unknown-type' as any,
        sourceData: {} as any,
        id: 'test'
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBe('Unsupported source type: unknown-type');
      }
    });
  });
});