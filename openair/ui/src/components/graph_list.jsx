import React from 'react';
import Graph from './visualization_item';

const GraphList = (props) => {
    // props: {graphs}

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