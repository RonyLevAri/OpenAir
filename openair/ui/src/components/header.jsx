import React from 'react';

const Header = (props) => {

    return (
        <div className="header w3-row w3-border">
            <div className="logo w3-col m3 dark-primary-color col-stretch col-header">
            </div>
            <div className="w3-col m9 white col-stretch col-header">
                <button className="w3-btn accent-color text-primary-color text-strong">Create New View</button>
                <button className="w3-btn w3-right accent-color text-primary-color text-strong">Sign Up</button>
            </div>
        </div>
    );
};

export default Header;