import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectStation} from '../actions/index';
import Station from '../components/station_list_item';

class StationList extends React.Component {

    constructor(props) {
        super(props);
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

// promote component to be a react container -
// get its props for the redux store
// emmit an action using an action creator
// both these functions will aid creating a wrapper react-redux component
// instead of the regular one, that get his properties from the redux store
// and report the store of particular action

const mapStateToProps = (state) => {
    return {
        stations: state.stations
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectStation: selectStation
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StationList);