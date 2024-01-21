import React from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

interface LocationListProps {
  onSelectLocation: (value: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({ onSelectLocation }) => {
	const { locationList } = useSelector((state: RootState) => state.trafficImages);
	
	// Check if the location list is empty
	if (locationList.length === 0) {
		return <p>No locations available.</p>;
	}

	return (
		<select onChange={(e) => onSelectLocation(e.target.value)}>
			{locationList.map((location, index) => (
				<option key={index} value={location.address}>
					{location.address} ({location.area})
				</option>
			))}
		</select>
	);
};

export default LocationList;
