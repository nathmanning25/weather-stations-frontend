import { WeatherStation, APIResponse } from "@/types/weatherStations";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// -------------------------------
// Get all weather stations (with optional state filter)
// -------------------------------

export async function fetchWeatherStations(state?: string): Promise<APIResponse<WeatherStation[]>> {
	try {
		const url = state
			? `${BASE_URL}/weather-stations?state=${state}`
			: `${BASE_URL}/weather-stations`;

		const res = await fetch(url, { cache: 'no-store' });
		if (!res.ok) throw new Error("Failed to fetch weather stations");

		const data = await res.json();
		return { status: 'success', data };
	} catch (error) {
		console.error(error);
		return { status: 'error', error: error instanceof Error ? error.message : String(error), data: [] };
	}
}

// -------------------------------
// Fetch single weather station by ID
// -------------------------------

export async function fetchSingleWeatherStation(id: string): Promise<APIResponse<WeatherStation[]>> {
	try {
		const url = `${BASE_URL}/weather-stations/${id}`;

		const res = await fetch(url);
		if (!res.ok) throw new Error("Failed to fetch weather station");

		const data = await res.json();
		return { status: 'success', data };
	} catch (error) {
		console.error(error);
		return { status: 'error', error: error instanceof Error ? error.message : String(error), data: [] };
	}
}

// -------------------------------
// Get all weather stations states 
// -------------------------------

export async function fetchWeatherStationsStates(): Promise<APIResponse<string[]>> {
	try {
		const url = `${BASE_URL}/weather-stations/states/all`;

		const res = await fetch(url);
		if (!res.ok) throw new Error("Failed to fetch weather stations states");

		const data = await res.json();
		return { status: 'success', data };
	} catch (error) {
		console.error(error);
		return { status: 'error', error: error instanceof Error ? error.message : String(error), data: [] };
	}
}