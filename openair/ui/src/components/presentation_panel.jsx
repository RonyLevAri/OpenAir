import React from 'react';
import ChoicePanel from './choices_panel';
import GraphList from './graph_list';
import GIS from './gis';

const PresentationPanel = (props) => {
    // props: {graphSelections, onGraphClick, graphs}
    return (
        <div className="presentation w3-col m9 col-stretch secondary-text-color">
            <div className="w3-row">
                <ChoicePanel graphSelections={props.graphSelections} onChoiceDelete={props.onChoiceDelete}/>
                <GraphList graphs={props.graphs} onGraphClick={props.onGraphClick} onGraphDelete={props.onGraphDelete}/>
                <GIS
                    initialCenter={props.initialCenter}
                    initialZoom={props.initialZoom}
                    stations={props.stations}/>
            </div>
        </div>
    );
};

export default PresentationPanel;