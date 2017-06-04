import React from 'react';
import Pollutant from './pollutant_teal';

const PollutantBoard = (props) => {

    let pollutants = props.pollutants.map(pollutant => {
        return (
            <Pollutant
                key={pollutant.key}
                name={pollutant.name}
                isSelectable={pollutant.isSelectable}
                isChosen={pollutant.isChosen}
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