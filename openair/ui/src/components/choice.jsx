import React from 'react';

const Choice = (props) => {

    // props: {key, id, name}

    return (
        <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
            <div className="badge-text">{props.name}</div>
            <button className="w3-button w3-circle light-primary-color">x</button>
        </div>
    );
};

export default Choice;