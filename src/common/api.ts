import { WeatherData } from "./types";

export const fetchData = async (url: string): Promise<WeatherData[] | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "haavardso@met.no",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();

    const timeseries: WeatherData[] = jsonData.properties.timeseries
      .slice(0, 3)
      .map((entry: any) => ({
        time: entry.time,
        air_temperature: entry.data.instant.details.air_temperature,
      }));

    return timeseries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
