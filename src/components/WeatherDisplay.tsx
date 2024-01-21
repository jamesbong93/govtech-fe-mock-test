import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchWeatherForecastsBegin } from '../features/weatherForcasts/weatherForecastsSlice';

interface WeatherDisplayProps {
    selectedDate: Date;
    selectedLocation: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ selectedDate, selectedLocation }) => {
    const dispatch = useDispatch();
    const { locationList } = useSelector((state: RootState) => state.trafficImages);
    const { weatherForecast, loading, error } = useSelector((state: RootState) => state.weatherForecasts);

    const foundLocation = locationList.find(location => location.address === selectedLocation);
    const selectedArea = foundLocation ? foundLocation.area : locationList[0]?.area;

    useEffect(() => {
        dispatch(fetchWeatherForecastsBegin({ selectedDate, selectedArea }));
    }, [dispatch, selectedDate, selectedArea]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Example of how to render weather forecasts
    return (
        <div>
            <h3>2 hours weather information</h3>
            {weatherForecast ? (<>
                <p>
                    Start: {weatherForecast?.valid_period?.start?.toLocaleString()}
                </p>
                <p>
                    End: {weatherForecast?.valid_period?.end?.toLocaleString()}
                </p>
                <p>
                Area: {weatherForecast.area}
                </p>
                <p>
                    Forecast: {weatherForecast.forecast}
                </p>
            </>)
            : <p>No weather forecasts available.</p>}
        </div>
    );
};

export default WeatherDisplay;
