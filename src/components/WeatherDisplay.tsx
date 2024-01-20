import React from 'react';

interface WeatherDisplayProps {
    weatherData: any
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
    return (
        <div>
            <h3>Weather Information</h3>
            <p>{weatherData}</p>
        </div>
    );
};

export default WeatherDisplay;
