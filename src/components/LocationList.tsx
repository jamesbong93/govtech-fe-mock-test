import React from 'react';

interface LocationListProps {
    locations: Array<{ label: string, value: string }>;
    onSelectLocation: (value: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onSelectLocation }) => {
    return (
        <select onChange={(e) => onSelectLocation(e.target.value)}>
            {locations.map((location, index) => (
                <option key={index} value={location.value}>
                    {location.label}
                </option>
            ))}
        </select>
    );
};

export default LocationList;
