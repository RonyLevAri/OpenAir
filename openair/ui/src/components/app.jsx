import React from 'react';
import 'whatwg-fetch';

// components
import Header from './header';
import Footer from './footer';
import VisualizationsMenu from './visualizations_menu';
import OptionsPanel from './options_panel';
import PresentationPanel from './presentation_panel';

// server api
import { getStations, getMeasurements } from '../utils/api';

// utils
import { buildStationObj, graphSelectionCompleted } from '../utils/common';

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
            allowCreateGraph: false,
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
                let stations = data.map(item => buildStationObj(item)).slice(0, 20);
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
        let request = this.state.graphSelections;

        newState.stations = this.clearSelections('stations');
        newState.pollutants = this.clearSelections('pollutants');
        newState.graphs = this.clearSelections('graphs');
        newState.graphSelections = this.clearChoices();
        newState.selectedGraph = null;
        newState.allowCreateGraph = false;

        this.getMeasurements(request);

        this.setState(
            newState
        );
    }

    handleGraphClick(graphId) {

        let newState = JSON.parse(JSON.stringify(this.state));

        newState.graphs.map(graph => {
            if (graph.id === graphId) {
                newState.graphSelections = graph.graphSelections;
                return Object.assign({}, graph, {isChosen: !graph.isChosen});
            }
            if (graph.id !== graphId && graph.isChosen)
                return Object.assign({}, graph, {isChosen: !graph.isChosen});
            return graph;
        });
        newState.stations = this.toggleSelections('stations', newState.graphSelections.station.id);
        newState.pollutants = this.toggleSelections('pollutants', newState.graphSelections.pollutant.id);
        newState.allowCreateGraph = false;

        this.setState(
            newState
        );
    }
    // TODO deal with duplicate code of handle clicks
    handlePollutantClick(pollutantId) {

        if (this.state.selectedGraph || (this.state.graphSelections.pollutant && (this.state.graphSelections.pollutant.id === pollutantId)))
            return;

        let newState = JSON.parse(JSON.stringify(this.state));

        newState.pollutants = newState.pollutants.map(pollutant => {
            if (pollutant.id === pollutantId) {
                newState.graphSelections.pollutant = Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
                return Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
            }
            if (pollutant.id !== pollutantId && pollutant.isChosen)
                return Object.assign({}, pollutant, {isChosen: !pollutant.isChosen});
            return pollutant;
        });

        newState.allowCreateGraph = graphSelectionCompleted(newState.graphSelections);

        this.setState(
            newState
        );

    }

    handleStationClick(stationId) {

        if (this.state.selectedGraph || (this.state.graphSelections.station && (this.state.graphSelections.station.id === stationId)))
            return;

        let newState = JSON.parse(JSON.stringify(this.state));
        newState.stations = newState.stations.map(station => {
            if (station.id === stationId){
                 newState.graphSelections.station = Object.assign({}, station, {isChosen: !station.isChosen});
                return Object.assign({}, station, {isChosen: !station.isChosen});
            }
            if (station.id !== stationId && station.isChosen)
                return Object.assign({}, station, {isChosen: !station.isChosen});
            return station;
        });

        newState.allowCreateGraph = graphSelectionCompleted(newState.graphSelections);

        this.setState(
            newState
        );
    }

    clearChoices() {
        return {pollutant: null, station: null, start: null, end: null};
    }

    toggleSelections(options, newChoiceId) {
        let newList = this.state[options].map(option => {
           if ((option.id === newChoiceId && !option.isChosen) || (option.id !== newChoiceId && option.isChosen))
               return Object.assign({}, option, {isChosen: !option.isChosen});
           return option;
        });
        return newList
    }

    clearSelections(options) {
        let newList = this.state[options].map(option => {
            if (option.isChosen)
                return Object.assign({}, option, {isChosen: !option.isChosen});
            return option;
        });
        return newList;
    }

    getMeasurements(graphSelections) {

        getMeasurements(graphSelections)
            .then(data => {
                let newState = JSON.parse(JSON.stringify(this.state));
                const newGraph = {
                    key: newState.graphCounter + 1, id: newState.graphCounter + 1, isChosen: false, isGraph: true, selections: this.state.graphSelections
                };
                newState.graphCounter += 1;
                newState.graphs = [...newState.graphs, newGraph];
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="root">
                <Header onCreateGraph={this.handleCreateGraph} allowCreateGraph={this.state.allowCreateGraph}/>
                <div className="main w3-row w3-border">
                    <VisualizationsMenu visualizationsOptions={this.state.visualizationsOptions}/>
                    <OptionsPanel
                        stations={this.state.stations}
                        pollutants={this.state.pollutants}
                        onPollutantClick={this.handlePollutantClick}
                        onStationClick={this.handleStationClick}/>
                    <PresentationPanel
                        graphSelections={this.state.graphSelections}
                        graphs={this.state.graphs}
                        onGraphClick={this.handleGraphClick}
                    />
                </div>
                <Footer/>
            </div>
        );
    }
}