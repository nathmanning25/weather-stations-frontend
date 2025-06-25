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
  const { stations, zoom = 6, center } = props;

  const defaultCenter: [number, number] = center || [-25.2744, 133.7751];

  const mapStyles = {
    height: "600px",
    width: "100%",
  };

  return (
    <div className={styles.mapContainer}>
      <StateFilter />
      <MapContainer center={defaultCenter} zoom={zoom} scrollWheelZoom={true} style={mapStyles}>
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
                    <ul>
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
