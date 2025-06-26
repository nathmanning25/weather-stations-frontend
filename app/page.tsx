import { fetchWeatherStations } from "@/services/api";
import Map from "@/components/Map";
import styles from "@/styles/stationsList.module.css";

type Props = {
  searchParams: { state?: string };
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const response = await fetchWeatherStations(params.state);
  
  return (
    <div>
      <main>
        {response.status === "success" ? (
          <>
            <h2 id="map-heading" className="sr-only">
              Weather Stations Map
            </h2>
            <Map stations={response.data} zoom={5} />
            <div className={styles.stationsContainer}>
              <section aria-labelledby="stations-list-heading" className={styles.stationsContainer}>
                <h2 id="stations-list-heading" className={styles.stationsTitle}>
                  Weather Stations List
                </h2>
                <ul className={styles.stationsList}>
                  {response.data.map((station) => (
                    <li key={station.id}>
                      <article className={styles.stationItem} aria-label={`Weather station: ${station.wsName}`}>
                        <div className={styles.stationName}>{station.wsName}</div>
                        <div className={styles.stationLocation}>
                          {station.site}, {station.state}
                        </div>
                        <div className={styles.stationCoordinates}>
                          Lat: {station.latitude}, Lng: {station.longitude}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        ) : (
          <p>Error fetching weather stations: {response.error || "Unknown error"}</p>
        )}
      </main>
    </div>
  );
}
