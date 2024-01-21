import React, { useState } from 'react';
import DateTimePicker from './components/DateTimePicker';
import LocationList from './components/LocationList';
import TrafficDisplay from './components/TrafficDisplay';
import WeatherDisplay from './components/WeatherDisplay';

const App: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedLocation, setSelectedLocation] = useState<string>('');

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleLocationChange = (value: string) => {
        setSelectedLocation(value);
    };

    return (
        <div>
            <DateTimePicker onDateChange={handleDateChange} />
            <LocationList onSelectLocation={handleLocationChange} />
            <TrafficDisplay selectedDate={selectedDate} selectedLocation={selectedLocation} />
            <WeatherDisplay selectedDate={selectedDate} selectedLocation={selectedLocation} />
        </div>
    );
};

export default App;
