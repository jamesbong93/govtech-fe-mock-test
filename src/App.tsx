import React, { useState } from "react";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import LocationList from "./components/LocationList";
import TrafficDisplay from "./components/TrafficDisplay/TrafficDisplay";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import "./App.css"; // Ensure you have an App.css file in the same directory

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Traffic and Weather App</h1>
      </header>
      <main className="app-main">
        <div className="datetime-location-container">
          <DateTimePicker onDateChange={handleDateChange} />
          <LocationList onSelectLocation={handleLocationChange} />
        </div>
        <div className="info-container"> {/* This is the new wrapper */}
          <div className="traffic-display">
            <TrafficDisplay selectedDate={selectedDate} selectedLocation={selectedLocation} />
          </div>
          <div className="weather-display">
            <WeatherDisplay selectedDate={selectedDate} selectedLocation={selectedLocation} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
