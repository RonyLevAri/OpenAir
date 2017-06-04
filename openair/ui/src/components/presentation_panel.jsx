import React from 'react';
import ChoicePanel from './choices_panel';
import GraphList from './graph_list';
import GIS from './gis';

const PresentationPanel = (props) => {
    return (
        <div className="presentation w3-col m9 col-stretch secondary-text-color">
            <div className="w3-row">
                <ChoicePanel graphSelections={props.graphSelections}/>
                <GraphList graphs={props.graphs}/>
                <GIS/>
            </div>
        </div>
    );
};

export default PresentationPanel;