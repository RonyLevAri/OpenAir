import React from 'react';
import SimpleLineChart from './timeline_graph';

// action creators
import { selectGraph, deleteGraph} from '../actions/index';

class VisualizationCard extends React.Component {
    // props: {key, id, isChosen, onGraphClick, onGraphDelete, measurements}
    constructor(props) {
        super(props);
        this.handelClick = this.handelClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handelClick() {
        const action = selectGraph(this.props.id);
        this.props.onGraphClick(this.props.id);
    }

    handleDelete() {
        const action = deleteGraph(this.props.id);
        this.props.onGraphDelete(this.props.id);
    }

    render() {
        let chosen = this.props.isChosen ? ' w3-card': ' w3-card-3';
        return (
            <div>
                <header className={`w3-container w3-blue w3-align-right`}>
                    <button onClick={this.handleDelete} className="w3-button w3-circle light-primary-color delete-btn btn-graph">x</button>
                </header>
                <div className={`${chosen} white graph`} onClick={this.handelClick}>
                    <SimpleLineChart measurements={this.props.measurements}/>
                </div>
            </div>
        );
    }
}

export default VisualizationCard;