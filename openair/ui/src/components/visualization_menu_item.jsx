import React from 'react';

const VisualizationKind = (props) => {

    let selectable = props.isSelectable ? ' selectable' : '';
    let chosen = props.isChosen ? ' v-menu-item-chosen' : '';

    return (
        <div className={`v-menu-item text-primary-color ${selectable} ${chosen}`}>
            <div className="w3-cell-middle w3-center">
                <i className="material-icons md-36">{props.icon}</i>
                <div>{props.name}</div>
            </div>
        </div>
    );
};

export default VisualizationKind;