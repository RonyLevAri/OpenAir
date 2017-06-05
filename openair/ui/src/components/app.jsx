import React from 'react';
import 'whatwg-fetch';

// components
import Header from './header';
import Footer from './footer';
import VisualizationsMenu from './visualizations_menu';
import OptionsPanel from './options_panel';
import PresentationPanel from './presentation_panel';

// server api
import { getStations } from '../utils/api';

// utils
import { buildStationObj } from '../utils/common';
import { graphSelectionCompleted } from '../utils/common';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            pollutants: [
                {key: 1, id: 1, name: 'NOX', isSelectable: true, isChosen: false},
                {key: 2, id: 2, name: 'O3', isSelectable: true, isChosen: false},
                {key: 3, id: 3,name: 'CO2', isSelectable: true, isChosen: false},
                {key: 4, id: 4, name: 'PM2.5', isSelectable: true, isChosen: false},
                {key: 5, id: 5, name: 'PM10', isSelectable: true, isChosen: false},
                {key: 6, id: 6, name: 'CO', isSelectable: true, isChosen: false}
            ],
            visualizationsOptions: [
                {key: 1, id: 1, name: 'Timeline', icon: 'timeline', isSelectable: true, isChosen: true},
                {key: 2, id: 2, name: 'AQI', icon: 'grain', isSelectable: true, isChosen: false}
            ],
            graphs: [
            ],
            graphCounter: 0,
            selectedGraph: null,
            graphSelections: {pollutant: null, station: null, start: null, end: null}

        };
        this.handleCreateGraph = this.handleCreateGraph.bind(this);
        this.handlePollutantClick = this.handlePollutantClick.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {

        getStations()
            .then(data => {
                let stations = data.map(item => buildStationObj(item)).slice(0, 8);
                this.setState({
                    stations: stations
                });
            })
            .catch(err => {
                console.log(err);
        });
    }

    handleCreateGraph() {

        let newState = JSON.parse(JSON.stringify(this.state));

        const newGraph = {
            key: newState.graphCounter + 1 , isChosen: true, isGraph: true
        };
        newState.graphCounter += 1;
        newState.graphs = [...newState.graphs, newGraph];
        newState.selectedGraph = newGraph.key;

        this.setState(
            newState
        );
    }

    handlePollutantClick(pollutantId) {

        let newState = JSON.parse(JSON.stringify(this.state));
        const chosenPollutant = newState.graphSelections.pollutant;

        newState.graphSelections.pollutant = pollutantId;
        newState.pollutants = newState.pollutants.map(pollutant => {
            if (pollutant.id === pollutantId) {
                newState.graphSelections.pollutant = Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
                return Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
            }
            if (chosenPollutant && chosenPollutant.id === pollutant.id)
                return Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
            return pollutant;
        });

        if (graphSelectionCompleted(newState.graphSelections)) {
            this.getMeasurements();
        }

        this.setState(
            newState
        );

    }

    handleStationClick(stationId) {

        let newState = JSON.parse(JSON.stringify(this.state));
        const chosenStation = newState.graphSelections.station;

        newState.graphSelections.station = stationId;
        newState.stations = newState.stations.map(station => {
            if (station.id === stationId){
                 newState.graphSelections.station = Object.assign({}, station, {isChosen: !station.isChosen});
                return Object.assign({}, station, {isChosen: !station.isChosen});
            }
            if (chosenStation && chosenStation.id === station.id)
                return Object.assign({}, station, {isChosen: !station.isChosen});
            return station;
        });

        if (graphSelectionCompleted(newState.graphSelections)) {
            this.getMeasurements();
        }
        this.setState(
            newState
        );
    }

    getMeasurements() {
        console.log('call django server');
    }

    render() {
        console.log('In app render');
        return (
            <div className="root">
                <Header onCreateGraph={this.handleCreateGraph}/>
                <div className="main w3-row w3-border">
                    <VisualizationsMenu visualizationsOptions={this.state.visualizationsOptions}/>
                    <OptionsPanel
                        stations={this.state.stations}
                        pollutants={this.state.pollutants}
                        onPollutantClick={this.handlePollutantClick}
                        onStationClick={this.handleStationClick}/>
                    <PresentationPanel graphSelections={this.state.graphSelections} graphs={this.state.graphs} />
                </div>
                <Footer/>
            </div>
        );
    }
}