import React from 'react';

const VisualizationCard = (props) => {
    // props: {isGraph}

    let display = props.isGraph ? ' graph': ' gis';

    return (
        <div className={`w3-card-2 w3-section white ${display}`}>content</div>
    );
};

export default VisualizationCard;