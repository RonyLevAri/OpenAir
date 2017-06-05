import React from 'react';
import Choice from './choice';

const ChoicesPanel = (props) => {
    // props: {graphSelection}

    let selectionArr = [];

    for (let prop in props.graphSelections) {
        let val = props.graphSelections[prop];
        if (val)
             selectionArr.push(val);
    }
    selectionArr = selectionArr.map((selection, index) => {
         return (
            <Choice
                key={index}
                id={selection.id}
                name={selection.name}/>
        );
    });

    if (selectionArr.length === 0) {
        selectionArr = '';
    }

    return (
        <div className="w3-col m12 chosen-list">
            {selectionArr}
        </div>

    );
};

export default ChoicesPanel;