import React, { useState, useEffect } from "react";
import { WeatherData } from "../common/types";
import { fetchData } from "../common/api";

const Timeseries = () => {
  const [data, setData] = useState<WeatherData[] | null>(null);
  const url =
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58";

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(url);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  const formatTime = (isoTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Oslo",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(isoTimeString).toLocaleString("en-US", options);
  };

  return (
    <div className="Display">
      <h2>Temperature</h2>
      {data !== null && Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((entry, index) => (
            <li key={index}>
              {formatTime(entry.time)}: {entry.air_temperature}°C
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Timeseries;
