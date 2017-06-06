import React from 'react';
import SimpleLineChart from './timeline_graph';

// action creators
import { selectGraph } from '../actions/index';

class VisualizationCard extends React.Component {
    // props: {key, id, isChosen, onGraphClicked, measurements}
    constructor(props) {
        super(props);
        this.handelClick = this.handelClick.bind(this);
    }

    handelClick() {
        const action = selectGraph(this.props.id);
        this.props.onGraphClicked(this.props.id);
    }

    render() {
        let chosen = this.props.isChosen ? ' w3-card-3': ' w3-card';
        return (
            <div className={`${chosen} w3-section white graph`} onClick={this.handelClick}>
                <header className={`w3-container w3-blue w3-align-right`}>
                    <button className="w3-button w3-circle light-primary-color">x</button>
                </header>
                <SimpleLineChart measurements={this.props.measurements}/>
            </div>
        );
    }
}

export default VisualizationCard;