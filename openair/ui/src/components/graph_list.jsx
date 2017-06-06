import React from 'react';
import Graph from './visualization_card';

const GraphList = (props) => {
    // props: {graphs, onGraphClicked}
    let content = props.graphs.map(graph => {
        return (
            <Graph
                key={graph.key}
                id={graph.id}
                isChosen={graph.isChosen}
                measurements={graph.measurements}
                onGraphClicked={props.onGraphClicked}
            />
        );
    });

    if (content.length === 0) {
        content = '';
    }
    return (
        <div className="w3-col m7 w3-container">
            {content}
        </div>
    );
};

export default GraphList;