import React from 'react';

// action creators
import { selectPollutant } from '../actions/index';

class PollutantTeal extends React.Component {
    // props: {key, id, name, isSelectable, isChosen, onPollutantClick}

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const action = selectPollutant(this.props.id);
        this.props.onPollutantClick(this.props.id);
    }

    render() {

        let selectable = this.props.isSelectable ? ' selectable' : '';
        let chosen = this.props.isChosen ? ' chosen' : '';

        return (
            <div className={`w3-third w3-center w3-border selectable ${selectable} ${chosen}`} onClick={this.handleClick}>
                <p>{this.props.name}</p>
            </div>
        );
    }
}

export default PollutantTeal;