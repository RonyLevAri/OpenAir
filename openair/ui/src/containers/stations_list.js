import React from 'react';
import {connect} from 'react-redux';
import Station from '../components/station_list_item';

class StationList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          stations: props.stations
        };
    }

    renderList() {
        return this.props.stations.map(station => {
            return (
                <Station
                    key={station.key}
                    name={station.name}
                    isActive={station.isActive}
                    isChosen={station.isChosen}
                />
            );
        });
    }

    render(){
        return (
            <ul className="station-list w3-ul w3-right-align">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stations
    };
}

export default connect(mapStateToProps)(StationList);