/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  TileLayerProps,
  MapContainerProps,
} from "react-leaflet";
import { SetStateAction, useState } from "react";

const MapSelector = ({
  onLocationSelect,
}: {
  onLocationSelect: (arg: number | string) => void;
}) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e: { latlng: string | number | SetStateAction<null> }) {
        setPosition(e.latlng as any);
        onLocationSelect(e.latlng as any);
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <MapContainer
      center={[51.505, -0.09] as MapContainerProps}
      zoom={13}
      style={{ height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={
          "&copy; OpenStreetMap contributors" as unknown as TileLayerProps
        }
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapSelector;
