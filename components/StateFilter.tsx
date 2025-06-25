"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWeatherStationsStates } from "@/services/api";
import styles from "@/styles/stateFilter.module.css";

export default function StateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentState = searchParams.get("state") || "";

  useEffect(() => {
    async function loadStates() {
      try {
        setLoading(true);
        const response = await fetchWeatherStationsStates();

        console.log("Fetched states:", response);
        if (response.status === "success") {
          setStates(response.data);
          setError(null);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError("Failed to load states");
        console.error("Error loading states:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStates();
  }, []);

  const handleStateChange = (selectedState: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedState) {
      params.set("state", selectedState);
    } else {
      params.delete("state");
    }

    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <div>Loading states...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Filter by State:</h3>

      <div>
        <input
          type="radio"
          id="state-all"
          name="state-filter"
            className={styles.stateFilterBtns}
          value=""
          checked={currentState === ""}
          onChange={() => handleStateChange("")}
        />
        <label htmlFor="state-all">All States</label>
      </div>

      {states.map((state) => (
        <div key={state}>
          <input
            type="radio"
            id={`state-${state}`}
            name="state-filter"
            className={styles.stateFilterBtns}
            value={state}
            checked={currentState === state}
            onChange={() => handleStateChange(state)}
          />
          <label htmlFor={`state-${state}`}>{state}</label>
        </div>
      ))}

      <p className={styles.currentState}>{currentState ? `Showing weather stations in ${currentState}` : "Showing weather stations from all states"}</p>
    </div>
  );
}
