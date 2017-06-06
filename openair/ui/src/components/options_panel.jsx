import React from 'react';
import OptionsTitle from './title_panel';
import PollutantBoard from './pollutant_board';
import TimeBoard from './time_board';
import StationsList from '../components/stations_list';


const OptionsPanel = (props) => {
// props: {pollutants, stations, onStationClick, onStationClick}

    return (
        <div className="options w3-col m2 dark-primary-color w3-center w3-border-right w3-border-left col-stretch">

            <div className="text-primary-color">
                <OptionsTitle title={'time options'}/>
                <TimeBoard/>
            </div>

            <div className="text-primary-color">
                <OptionsTitle title={'pollutant options'}/>
                <PollutantBoard
                    pollutants={props.pollutants}
                    onPollutantClick={props.onPollutantClick}/>
            </div>
            <OptionsTitle title={'station options'}/>
            <div className="stations text-primary-color">
                <StationsList
                    stations={props.stations}
                    onStationClick={props.onStationClick}/>
            </div>
        </div>
    );
};

export default OptionsPanel;
