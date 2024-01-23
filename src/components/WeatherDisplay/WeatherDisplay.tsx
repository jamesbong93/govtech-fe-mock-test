import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { fetchWeatherForecastsBegin } from "features/weatherForecasts/weatherForecastsSlice";
import styles from "./WeatherDisplay.module.css"; // Import your styles
import { WeatherDisplayProps } from "features/weatherForecasts/types";
import { Cloudy, PartlyCloudly, Rain, Sunny, ThunderRain } from "images";

/**
 * Component to display weather forecasts.
 * It uses the selected date and location to fetch and display the relevant weather forecast.
 */
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ selectedDate, selectedLocation }) => {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state: RootState) => state.trafficImages);
  const { weatherForecasts, loading, error } = useSelector((state: RootState) => state.weatherForecasts);

  // Determine the selected area based on the selected location
  const selectedArea = locationList?.find(location => location.address === selectedLocation)?.area || locationList[0]?.area;

  // Fetch weather forecasts when the component mounts or when selectedDate or selectedArea changes
  useEffect(() => {
    if (selectedArea) {
      dispatch(fetchWeatherForecastsBegin({ selectedDate, selectedArea }));
    }
  }, [dispatch, selectedDate, selectedArea]);

  // Find the forecast for the selected area
  const matchedAreaForecast = weatherForecasts?.forecasts?.find(f => f.area === selectedArea);
  const startDateTime = weatherForecasts?.valid_period?.start;
  const endDateTime = weatherForecasts?.valid_period?.end;

  // Assuming matchedAreaForecast.forecast is of type string
  const getForecastImg = (forecast = "") => {
    forecast = forecast.toLowerCase();
    
    switch (forecast) {
    case "sunny":
      return Sunny;
    case "cloudy":
    case "cloudy (day)":
    case "cloudy (night)":
    case "windy":
      return Cloudy;
    case "partly cloudy (day)":
    case "partly cloudy (night)":
      return PartlyCloudly;
    case "rain":
    case "light rain":
    case "moderate rain":
    case "light showers":
      return Rain;
    case "thunder rain":
      return ThunderRain;
    default:
      return Sunny;
    }
  };

  const forecastImg = getForecastImg(matchedAreaForecast?.forecast);

  // Conditional rendering based on loading, error, and data availability
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!matchedAreaForecast) return <p>No weather forecasts found.</p>;

  return (
    <div className={styles.weatherContainer}>
      <h2 className={styles.weatherTitle}>
        <p>
          Weather Forecast for 2 hours
        </p>
        <p>
          {matchedAreaForecast?.forecast}
        </p>
        <p>
          {new Date(startDateTime).toLocaleString("en-US", { hour: "numeric", hour12: true })} to {new Date(endDateTime).toLocaleString("en-US", { hour: "numeric", hour12: true })}
        </p>
      </h2>
      <div className={styles.imageCard}>
        <div className={styles.weatherImageContainer}>
          <img 
            src={forecastImg} 
            alt={matchedAreaForecast.forecast}
            className={styles.weatherImage} /* Apply the class here */
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
