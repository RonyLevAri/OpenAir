import React from 'react';
import OptionsTitle from './options_title_panel';
import PollutantBoard from './options_pollutant_board';
import TimeBoard from './options_time_board';
import StationsList from '../components/stations_list';

// import StationsList2 from '../containers/stations_list';

const OptionsPanel = (props) => {

    return (
        <div className="options w3-col m2 dark-primary-color w3-center w3-border-right w3-border-left col-stretch">

            <div className="text-primary-color">
                <OptionsTitle title={'time options'}/>
                <TimeBoard/>
            </div>


            <div className="text-primary-color">
                <OptionsTitle title={'pollutant options'}/>
                <PollutantBoard pollutants={props.pollutants}/>
            </div>


            <div className="text-primary-color">
                <OptionsTitle title={'station options'}/>
                <StationsList stations={props.stations}/>
            </div>
        </div>
    );
};

export default OptionsPanel;
