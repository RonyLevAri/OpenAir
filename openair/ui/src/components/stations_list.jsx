import React from 'react';
import Station from './station_list_item';

const StationList = (props) => {

    let stations = props.stations.map(station => {

        console.log("create stations instance in app");
        console.log("station key: " + station.key);
        console.log("station name: " + station.name);
        console.log("station is active: " + station.isActive);
        console.log("station is chosen: " + station.isChosen);
        return (
            <Station
                key={station.key}
                name={station.name}
                isActive={station.isActive}
                isChosen={station.isChosen}
            />
        );
    });

    return (
        <ul className="station-list w3-ul w3-right-align">
            {stations}
        </ul>
    );
};

export default StationList;