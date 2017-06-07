import React from 'react';
import 'whatwg-fetch';

// TODO deal with duplicate code of handle clicks

// components
import Header from './header';
import Footer from './footer';
import VisualizationsMenu from './visualizations_menu';
import OptionsPanel from './options_panel';
import PresentationPanel from './presentation_panel';

// server api
import { getStations, getMeasurements } from '../utils/api';

// utils
import { buildStationObj, graphSelectionCompleted, buildMeasurementObj } from '../utils/common';

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
            graphs: [],
            allowCreateGraph: false,
            graphCounter: 0,
            selectedGraph: null,
            graphSelections: {pollutant: null, station: null, start: null, end: null}

        };
        this.handleGraphClick = this.handleGraphClick.bind(this);
        this.handleCreateGraph = this.handleCreateGraph.bind(this);
        this.handlePollutantClick = this.handlePollutantClick.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
        this.handleGraphDelete = this.handleGraphDelete.bind(this);
        this.handleChoiceDelete = this.handleChoiceDelete.bind(this);
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
        let graphSelections = JSON.parse(JSON.stringify(this.state.graphSelections));

        newState.stations = this.clearSelections('stations');
        newState.pollutants = this.clearSelections('pollutants');
        newState.graphs = this.clearSelections('graphs');
        newState.graphSelections = this.clearChoices();
        newState.selectedGraph = null;
        newState.allowCreateGraph = false;

        this.getMeasurements(graphSelections);

        this.setState(
            newState
        );
    }

    handleGraphDelete(graphId) {

        let newState = JSON.parse(JSON.stringify(this.state));

        if (graphId === newState.selectedGraph) {
            newState.stations = this.clearSelections('stations');
            newState.pollutants = this.clearSelections('pollutants');
            newState.graphs = this.clearSelections('graphs');
            newState.graphSelections = this.clearChoices();
            newState.selectedGraph = null;
            newState.allowCreateGraph = false;
        }
        newState.graphs = newState.graphs.filter(graph => {
           return (graph.id !== graphId);
        });
        this.setState(
            newState
        );
    }

    handleGraphClick(graphId) {

        let newState = JSON.parse(JSON.stringify(this.state));

        if (this.state.selectedGraph && this.state.selectedGraph === graphId) {
            newState.stations = this.clearSelections('stations');
            newState.pollutants = this.clearSelections('pollutants');
            newState.graphs = this.clearSelections('graphs');
            newState.graphSelections = this.clearChoices();
            newState.selectedGraph = null;
            newState.allowCreateGraph = false;
        } else {
            newState.selectedGraph = graphId;
            newState.graphs = newState.graphs.map(graph => {
                if (graph.id === graphId) {
                    newState.graphSelections = graph.selections;
                    return Object.assign({}, graph, {isChosen: !graph.isChosen});
                }
                if (graph.id !== graphId && graph.isChosen)
                    return Object.assign({}, graph, {isChosen: !graph.isChosen});
                return graph;
            });
            newState.stations = this.toggleSelections('stations', newState.graphSelections.station.id);
            newState.pollutants = this.toggleSelections('pollutants', newState.graphSelections.pollutant.id);
            newState.allowCreateGraph = false;
        }
        this.setState(
            newState
        );
    }

    handleChoiceDelete(choiceType) {

        if (this.state.selectedGraph)
            return;

        let newState = JSON.parse(JSON.stringify(this.state));

        if (choiceType === 'station') {
            newState.stations = this.clearSelections('stations');
            newState.graphSelections.station = null;
        }
        if (choiceType === 'pollutant') {
            newState.pollutants = this.clearSelections('pollutants');
            newState.graphSelections.pollutant = null;
        }
        newState.allowCreateGraph = graphSelectionCompleted(newState.graphSelections);
        this.setState (
            newState
        );
    }

    handlePollutantClick(pollutantId) {

        if (this.isExistingGraphData() || this.isPollutantAlreadySelected(pollutantId))
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

        if (this.isExistingGraphData() || this.isStationsAlreadySelected(stationId))
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

    isExistingGraphData() {
        return this.state.selectedGraph;
    }

    isStationsAlreadySelected(stationId) {
        return (this.state.graphSelections.station && (this.state.graphSelections.station.id === stationId));
    }

    isPollutantAlreadySelected(pollutantId) {
        return (this.state.graphSelections.pollutant && (this.state.graphSelections.pollutant.id === pollutantId));
    }

    clearChoices() {
        return {pollutant: null, station: null, start: null, end: null};
    }

    toggleSelections(options, newChoiceId) {
        return this.state[options].map(option => {
           if ((option.id === newChoiceId && !option.isChosen) || (option.id !== newChoiceId && option.isChosen))
               return Object.assign({}, option, {isChosen: !option.isChosen});
           return option;
        });
    }

    clearSelections(options) {
        return this.state[options].map(option => {
            if (option.isChosen)
                return Object.assign({}, option, {isChosen: !option.isChosen});
            return option;
        });
    }

    getMeasurements(graphSelections) {

        getMeasurements(graphSelections)
            .then(data => {
                let measurements = data.map(measurement => buildMeasurementObj(measurement));
                let newState = JSON.parse(JSON.stringify(this.state));
                const newGraph = {
                    key: newState.graphCounter + 1, id: newState.graphCounter + 1, isChosen: false, selections: graphSelections, measurements: measurements
                }

                newState.graphCounter += 1;
                newState.graphs = [... this.state.graphs, newGraph];
                this.setState(
                    newState
                );
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
                        onGraphDelete={this.handleGraphDelete}
                        onChoiceDelete={this.handleChoiceDelete}
                    />
                </div>
                <Footer/>
            </div>
        );
    }
}