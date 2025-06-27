import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapInstance, MapInstanceOptions } from "map-library";

interface MapContextType {
  mapInstance: MapInstance | null;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

interface MapInstanceProvider extends Omit<MapInstanceOptions, "container"> {
  children: React.ReactNode;
}

export const MapInstanceProvider: React.FC<MapInstanceProvider> = ({
  children,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const instance = new MapInstance({
        container: mapContainerRef.current,
        center: [-76.6122, 39.2904],
        zoom: 10,
        style:
          "https://api.maptiler.com/maps/streets-v2/style.json?key=k23TlwjGXfhsNOcktPLI",
      });
      setMapInstance(instance);

      return () => {
        instance.destroy();
        setMapInstance(null);
      };
    }
  }, [mapContainerRef]);

  const contextValue = useMemo(() => ({ mapInstance }), [mapInstance]);

  return (
    <MapContext.Provider value={{ mapInstance: contextValue.mapInstance }}>
      <div
        ref={mapContainerRef}
        style={{ width: "2000px", height: "90vh" }} // Default style
      />
      {mapInstance && children}
    </MapContext.Provider>
  );
};
