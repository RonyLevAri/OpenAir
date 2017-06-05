import React from 'react';
import 'whatwg-fetch';

import Header from './header';
import Footer from './footer';
import VisualizationsMenu from './visualizations_menu';
import OptionsPanel from './options_panel';
import PresentationPanel from './presentation_panel';

// import ChoicePanel from './choices_panel';
// import GraphList from './graph_list';
// import GIS from './gis';


// import StationsList from './stations_list';
// import StationsList2 from '../containers/stations_list';

import {getStations} from '../utils/api';
import {buildStationObj} from '../utils/common';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            pollutants: [
                {key: 1, name: 'NOX', isSelectable: true, isChosen: false},
                {key: 2, name: 'O3', isSelectable: true, isChosen: false},
                {key: 3, name: 'CO2', isSelectable: true, isChosen: false},
                {key: 4, name: 'PM2.5', isSelectable: true, isChosen: false},
                {key: 5, name: 'PM10', isSelectable: true, isChosen: false},
                {key: 6, name: 'CO', isSelectable: true, isChosen: false}
            ],
            visualizationsOptions: [
                {key: 1, name: 'Timeline', icon: 'timeline', isSelectable: true, isChosen: true},
                {key: 2, name: 'AQI', icon: 'grain', isSelectable: true, isChosen: false}
            ],
            graphs: [
                {key: 1, isChosen: true, isGraph: true},
                {key: 2, isChosen: false, isGraph: true}
            ],
            selectedGraph: null,
            graphSelections: [
                // {key: 1, text: 'stam', type: 'pollutant'},
                // {key: 2, text: 'stam', type: 'station'},
                // {key: 3, text: 'stam', type: 'start'},
                // {key: 4, text: 'stam', type: 'end'},
            ]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {

        getStations()
            .then(data => {
                let stations = data.map(item => buildStationObj(item)).slice(0, 8);
                console.log("constructing the station objects for app props: " + stations);
                this.setState({
                    stations: stations
                });
            })
            .catch(err => {
                console.log(err);
        });
    }

    handleClick() {

    }

    render() {
        console.log('In app render');
        return (
            <div className="root">
                <Header/>
                <div className="main w3-row w3-border">
                    <VisualizationsMenu visualizationsOptions={this.state.visualizationsOptions}/>
                    <OptionsPanel stations={this.state.stations} pollutants={this.state.pollutants} />
                    <PresentationPanel graphSelections={this.state.graphSelections} graphs={this.state.graphs} />*/}
                </div>
                <Footer/>
            </div>
        );
    }
}