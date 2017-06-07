import React from 'react';
import Choice from './choice';

const ChoicesPanel = (props) => {
    // props: {graphSelection}

    let selectionArr = [];
    let choiceType = [];

    for (let prop in props.graphSelections) {
        let val = props.graphSelections[prop];
        if (val) {
            selectionArr.push(val);
            choiceType.push(prop.toString());
        }
    }
    selectionArr = selectionArr.map((selection, index) => {
         return (
            <Choice
                key={index}
                id={selection.id}
                name={selection.name}
                choiceType={choiceType[index]}
                onChoiceDelete={props.onChoiceDelete}
            />
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