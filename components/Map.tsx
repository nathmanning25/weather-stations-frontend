"use client";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import StateFilter from "./StateFilter";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface Measurement {
  id: number;
  weatherStationId: number;
  variable_name: string;
  value: number;
  timestamp: string;
}

interface WeatherStation {
  id: number;
  wsName: string;
  site: string;
  portfolio: string;
  state: string;
  latitude: number;
  longitude: number;
  measurements: Measurement[];
}

interface MapProps {
  stations: WeatherStation[];
  zoom?: number;
  center?: [number, number];
}

export default function Map(props: MapProps) {
  const { stations, zoom = 6, center } = props;
  const [showMore, setShowMore] = useState(false);

  const defaultCenter: [number, number] = center || [-25.2744, 133.7751];

  const mapStyles = {
    height: "600px",
    width: "100%",
  };

  const showMoreMeasurements = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMore(true);
  };

  return (
    <>
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
              <div>
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
                    <ul style={{ fontSize: "12px", margin: 0, paddingLeft: "15px" }}>
                      {station.measurements.slice(0, 3).map((measurement) => (
                        <li key={measurement.id}>
                          {measurement.variable_name}: {measurement.value}
                          <br />
                          <small>{new Date(measurement.timestamp).toLocaleString()}</small>
                        </li>
                      ))}
                    </ul>
                    {station.measurements.length > 3 && (
                      <small onClick={showMoreMeasurements}>
                        ...and {showMore ? station.measurements.length - 3 : 0} more
                      </small>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
