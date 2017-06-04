import React from 'react';
import Graph from './visualization_item';

const GraphList = (props) => {

    let content = props.graphs.map(graph => {
        return (
            <Graph
                key={graph.key}
                isGraph={graph.isGraph}
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