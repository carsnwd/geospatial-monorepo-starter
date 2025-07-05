import type React from "react";
import {
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
  children?: React.ReactNode;
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
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${import.meta.env.VITE_MAP_TILER_KEY}`,
      });
      setMapInstance(instance);

      return () => {
        instance.destroy();
        setMapInstance(null);
      };
    }
  }, []);

  const contextValue = useMemo(() => ({ mapInstance }), [mapInstance]);

  return (
    <MapContext.Provider value={{ mapInstance: contextValue.mapInstance }}>
      <div className="relative w-full h-[100vh]">
        <div
          ref={mapContainerRef}
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        />
        {children}
      </div>
    </MapContext.Provider>
  );
};
