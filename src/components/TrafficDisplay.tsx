import React from 'react';

interface TrafficDisplayProps {
    trafficData: any
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({ trafficData }) => {
    return (
        <div>
            <h3>Traffic Information</h3>
            <p>{trafficData}</p>
        </div>
    );
};

export default TrafficDisplay;
