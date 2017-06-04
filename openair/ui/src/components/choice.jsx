import React from 'react';

const Choice = (props) => {

    return (
        <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
            <div className="badge-text">{props.text}</div>
            <button className="w3-button w3-circle light-primary-color">x</button>
        </div>
    );
};

export default Choice;