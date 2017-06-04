import React from 'react';
import Choice from './choice';

const ChoicesPanel = (props) => {

    let choices = props.graphSelections.map(choice => {
        return (
            <Choice text={choice.text}/>
        );
    });
    if (choices.length === 0) {
        choices = '';
    }
    return (
        <div className="w3-col m12 chosen-list">
            {choices}
        </div>

    );
};

export default ChoicesPanel;