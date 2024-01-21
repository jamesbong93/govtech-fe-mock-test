import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchWeatherForecastsBegin } from 'features/weatherForecasts/weatherForecastsSlice';

interface WeatherDisplayProps {
    selectedDate: Date;
    selectedLocation: string;
}

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

    // Conditional rendering based on loading, error, and data availability
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weatherForecasts) return <p>No weather forecasts available.</p>;

    // Find the forecast for the selected area
    const matchedAreaForecast = weatherForecasts?.forecasts?.find(f => f.area === selectedArea);

    return (
        <div>
            <p>Start: {weatherForecasts?.valid_period?.start?.toLocaleString()}</p>
            <p>End: {weatherForecasts?.valid_period?.end?.toLocaleString()}</p>
            {matchedAreaForecast ? (
                <div>
                    <p>Area: {matchedAreaForecast.area}</p>
                    <p>Forecast: {matchedAreaForecast.forecast}</p>
                </div>
            ) : <p>No matching forecast found.</p>}
        </div>
    );
};

export default WeatherDisplay;
