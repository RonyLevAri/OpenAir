import React from 'react';

// action creators
import { deleteChoice } from '../actions/index';

class Choice extends React.Component {
    // props: {key, id, name, choiceType, onChoiceDelete}

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const action = deleteChoice(this.props.choiceType);
        this.props.onChoiceDelete(this.props.choiceType);
    }

    render() {
         return (
            <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
                <div className="badge-text">{this.props.name}</div>
                <button onClick={this.handleClick} className="w3-button w3-circle light-primary-color delete-btn">x</button>
            </div>
        );
    }
}

export default Choice;