export type UnitGroup = "metric" | "us";

interface CurrentWeatherData {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    timestamp: string;
    icon: string;
}

export interface CurrentWeatherResponse {
    source: "cache" | "live";
    city: string;
    unitGroup: UnitGroup;
    fetchedAt: string;
    data: CurrentWeatherData;
}

export async function fetchWeather(
    city: string,
    unit: UnitGroup
): Promise<CurrentWeatherResponse | undefined> {
    if (!city.trim()) return undefined;
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/weather`);
    url.searchParams.append("city", city);
    url.searchParams.append("unitGroup", unit);

    const res = await fetch(url.toString());

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error("Failed to parse weather data");
    }

    if (res.ok) {
        return data;
    } else {
        throw new Error(data.message || "Failed to fetch weather data");
    }
}
