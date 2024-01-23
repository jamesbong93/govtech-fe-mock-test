import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { GroupedLocations, Location } from "features/trafficImages/types";

interface LocationListProps {
  onSelectLocation: (value: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({ onSelectLocation }) => {
  const { locationList } = useSelector((state: RootState) => state.trafficImages);

  // Create an object to group locations by area
  const groupedLocations: GroupedLocations = locationList.reduce((groups: GroupedLocations, location: Location) => {
    const area = location.area || "Other"; // Fallback to 'Other' if area is not defined
    groups[area] = groups[area] || [];
    groups[area].push(location);
    return groups;
  }, {});

  // Check if the location list is empty
  if (locationList && locationList.length === 0) {
    return <p>No locations available.</p>;
  }

  return (
    <div className="location-list-container">
      <select className="location-list" onChange={(e) => onSelectLocation(e.target.value)}>
        {Object.keys(groupedLocations).map(area => (
          <optgroup label={area} key={area}>
            {groupedLocations[area].map((location, index) => (
              <option key={index} value={location.address}>
                {location.address}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default LocationList;
