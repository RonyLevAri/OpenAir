import React from 'react';

const PollutantTeal = (props) => {

    let selectable = props.isSelectable ? ' selectable' : '';
    let chosen = props.isChosen ? ' chosen' : '';

    return (
        <div className={`w3-third w3-center w3-border selectable ${selectable} ${chosen}`}>
            <p>{props.name}</p>
        </div>
    );
};

export default PollutantTeal;