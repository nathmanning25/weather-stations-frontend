import {   fetchWeatherStations } from "@/services/api";
import Map from "@/components/Map";

type Props = {
  searchParams: { state?: string };
};

export default async function Home({ searchParams }: Props) {
  const response = await fetchWeatherStations(searchParams.state);

  return (
    <div>
      <main>
        <h1>Australian Weather Stations</h1>
        
        {response.status === "success" ? (
          <>
            <Map stations={response.data} zoom={4} />
            <h2>Weather Stations List</h2>
            <ul>
              {response.data.map((station) => (
                <li key={station.id}>
                  <strong>{station.wsName}</strong> - {station.site}, {station.state}
                  <br />
                  Latitude: {station.latitude}, Longitude: {station.longitude}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Error fetching weather stations: {response.error || "Unknown error"}</p>
        )}
      </main>
    </div>
  );
}
