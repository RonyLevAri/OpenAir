import React from 'react';

export default class Station extends React.Component {

    constructor(props) {
        super(props);
        console.log("In constructor, and the props: " + props.isActive + " " + props.isChosen);
        this.state = {
            isActive: props.isActive,
            isChosen: props.isChosen
        };

        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.isActive !== nextState.isActive || this.state.isChosen !== nextState.isChosen);
    }

    handleClick() {
        if (this.state.isActive && !this.state.isChosen) {
            console.log(`now ${this.props.name} had been selected, need to report my parents`);
        }
    }

    render() {
        console.log('In stations list item render');

        let selectable = this.state.isActive ? ' selectable' : '';
        let chosen = this.state.isChosen ? ' chosen' : '';

        return (
            <li onClick={this.handleClick} className={"text-primary-color selectable" + selectable + chosen}>
                <span>{this.props.name}</span>
                <i className="material-icons">settings_input_antenna</i>
            </li>
        );
    }
}