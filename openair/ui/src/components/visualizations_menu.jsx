import React from 'react';
import VisualizationKind from './visualization_menu_item';

const VisualizationsMenu = (props) => {

    let visualizations = props.visualizationsOptions.map(kind => {
        return (
            <VisualizationKind
                key={kind.key}
                name={kind.name}
                icon={kind.icon}
                isSelectable={kind.isSelectable}
                isChosen={kind.isChosen}
            />
        );
    });
    return (
        <div className="menu w3-col m1 default-primary-color col-stretch">
            {visualizations}
        </div>
    );
};

export default VisualizationsMenu;