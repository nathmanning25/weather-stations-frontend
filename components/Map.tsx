"use client";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import StateFilter from "./StateFilter";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from "@/styles/map.module.css";
import { WeatherStation } from "@/types/weatherStations";

interface MapProps {
  stations: WeatherStation[];
  zoom?: number;
  center?: [number, number];
}

export default function Map(props: MapProps) {
  const { stations, zoom = 5, center } = props;

  // State center coordinates
  const stateCenters: { [key: string]: [number, number] } = {
    NSW: [-31.2532, 146.9211],
    VIC: [-37.0201, 144.9646],
    QLD: [-20.9176, 142.7028],
    WA: [-27.6728, 121.6283],
    SA: [-30.0002, 136.2092],
    TAS: [-41.6368, 145.5788],
    NT: [-12.4634, 130.8456],
    ACT: [-35.4735, 149.0124],
  };

  // Get center based on stations' state or use provided center
  const getMapCenter = (): [number, number] => {
    if (center) return center;

    if (stations.length > 0) {
      const firstStationState = stations[0].state;

      // Check if all stations are from the same state
      const allSameState = stations.every((station) => station.state === firstStationState);
      if (allSameState && stateCenters[firstStationState]) {
        return stateCenters[firstStationState];
      }
    }

    return [-25.2744, 133.7751]; // Default Australia center
  };

  const defaultCenter: [number, number] = getMapCenter();

  const mapStyles = {
    height: "600px",
    width: "100%",
  };

  return (
    <div className={styles.mapContainer}>
      <StateFilter />
      <MapContainer
        key={`${defaultCenter[0]}-${defaultCenter[1]}`}
        center={defaultCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        style={mapStyles}
      >
        <TileLayer
          data-testid="tile-layer"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => (
          <Marker key={station.id} position={[station.latitude, station.longitude]}>
            <Popup>
              <div role="region" aria-label={`Weather station: ${station.wsName}`}>
                <h4>{station.wsName}</h4>
                <p>
                  <strong>Location:</strong> {station.site}, {station.state}
                </p>
                <p>
                  <strong>Portfolio:</strong> {station.portfolio}
                </p>
                {station.measurements.length > 0 && (
                  <div>
                    <h5>Latest Measurements:</h5>
                    <ul className={styles.popupList}>
                      {station.measurements.slice(0, 3).map((measurement) => (
                        <li key={measurement.id}>
                          {measurement.variable_name}: {measurement.value}
                          <br />
                          <small>{new Date(measurement.timestamp).toLocaleString()}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
