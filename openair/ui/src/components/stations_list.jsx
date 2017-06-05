import React from 'react';
import Station from './station_list_item';


const StationList = (props) => {
    // props: {stations, onStationClick}

    let stations = props.stations.map(station => {

        return (
            <Station
                key={station.key}
                id={station.id}
                name={station.name}
                isActive={station.isActive}
                isChosen={station.isChosen}
                isSelectable={station.isSelectable}
                onStationClick={props.onStationClick}
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