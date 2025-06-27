import { describe, expect, it, mock } from "bun:test";
import { LayersManager } from "./LayersManager";

describe("LayersManager", () => {
  describe("addLayer", () => {
    it("should add a layer", () => {
      const mockMap = {
        addLayer: mock(),
        addSource: mock(),
      };
      const manager = new LayersManager();
      const layer = { id: "layer1", name: "Test Layer" };
      manager.addLayer(layer);
      expect(manager.getLayers()).toContain(layer);
      expect(mockMap.addLayer).toHaveBeenCalledWith(layer);
    });

    it("should not add a layer with the same ID", () => {
      const manager = new LayersManager();
      const layer = { id: "layer1", name: "Test Layer" };
      manager.addLayer(layer);
      expect(() => manager.addLayer(layer)).toThrow(
        "Layer with this ID already exists"
      );
    });
  });
});
