import React from 'react';
import Container from './visualization_item';

const GIS = (props) => {

    return (
        <div className="gis w3-col m5 w3-container">
            <Container
                key={1}
                isGraph={false}
            />
        </div>
    );
};

export default GIS;