import React from 'react';
import Pollutant from './pollutant_teal';

const PollutantBoard = (props) => {
    // props: {pollutants, onPollutantClick}
    let pollutants = props.pollutants.map(pollutant => {
        return (
            <Pollutant
                key={pollutant.key}
                id={pollutant.id}
                name={pollutant.name}
                isSelectable={pollutant.isSelectable}
                isChosen={pollutant.isChosen}
                onPollutantClick={props.onPollutantClick}
            />
        );
    });

    let firstRow = pollutants.slice(0, 3);
    let secondRow = pollutants.slice(3, 6);


    return (
        <div>
            <div className="w3-row">
                {firstRow}
            </div>
            <div className="w3-row">
                {secondRow}
            </div>
        </div>
    );
};

export default PollutantBoard;