import React from 'react';

// action creator
import { selectStation } from '../actions/index';

export default class Station extends React.Component {
    // props: {key, id, name, isSelectable, isActive, isChosen, onStationClick}
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const action = selectStation(this.props.id);
        this.props.onStationClick(this.props.id);
    }

    render() {
        let selectable = (this.props.isActive && this.props.isSelectable) ? ' selectable' : '';
        let chosen = this.props.isChosen ? ' chosen' : '';

        return (
            <li onClick={this.handleClick} className={"text-primary-color selectable" + selectable + chosen}>
                <span>{this.props.name}</span>
                <i className="material-icons">settings_input_antenna</i>
            </li>
        );
    }
}