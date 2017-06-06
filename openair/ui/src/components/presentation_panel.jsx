import React from 'react';
import ChoicePanel from './choices_panel';
import GraphList from './graph_list';
import GIS from './gis';

const PresentationPanel = (props) => {
    // props: {graphSelections, onGraphClick, graphs}
    return (
        <div className="presentation w3-col m9 col-stretch secondary-text-color">
            <div className="w3-row">
                <ChoicePanel graphSelections={props.graphSelections}/>
                <GraphList graphs={props.graphs} onGraphClick={props.onGraphClick}/>
                <GIS/>
            </div>
        </div>
    );
};

export default PresentationPanel;