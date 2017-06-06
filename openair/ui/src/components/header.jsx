import React from 'react';

import {createGraph} from '../actions/index';

class Header extends React.Component {

    // props: {onCreateGraph, allowCreateGraph}

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.allowCreateGraph) {
            let action = createGraph();
            this.props.onCreateGraph();
        }
    }

    render() {

        let inactive = this.props.allowCreateGraph ? ' ': ' inactive-dark';
        return (
            <div className="header w3-row w3-border">
                <div className="logo w3-col m3 dark-primary-color col-stretch col-header">
                </div>
                <div className="w3-col m9 white col-stretch col-header">
                    <button className={`w3-btn accent-color text-primary-color text-strong ${inactive}`} onClick={this.handleClick}>Create New Graph</button>
                    <button className="w3-btn w3-right accent-color text-primary-color text-strong">Sign Up</button>
                </div>
            </div>
        );
    }
}

export default Header;