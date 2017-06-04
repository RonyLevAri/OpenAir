import React from 'react';
import 'whatwg-fetch';

import Header from './header';
import Footer from './footer';
import OptionsTitle from './options_title_panel';
import PollutantBoard from './options_pollutant_board';
import VisualizationsMenu from './visualizations_menu';

// import StationsList from './stations_list';
import StationsList2 from '../containers/stations_list';

// import {getStations} from '../utils/api';
// import {buildStationObj} from '../utils/common';

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
            visualizations: [
                {key: 1, name: 'Timeline', icon: 'timeline', isSelectable: true, isChosen: true},
                {key: 2, name: 'AQI', icon: 'grain', isSelectable: true, isChosen: false}
            ],
            selectedStation: null,
            selectedPollutant: null,
            selectedStartTime: null,
            selectedEndTime: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {

        // getStations()
        //     .then(data => {
        //         let stations = data.map(item => buildStationObj(item)).slice(0, 8);
        //         console.log("constructing the station objects for app props: " + stations);
        //         this.setState({
        //             stations: stations
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        // });
    }

    handleClick() {

        // TODO dispatch to the store

        // getStations()
        //     .then(data => {
        //         let stations = data.map(item => buildStationObj(item)).slice(0, 8);
        //         console.log("constructing the station objects for app props: " + stations);
        //         this.setState({
        //             stations: stations
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        // });
    }

    render() {
        console.log('In app render');
        return (
            <div className="root">
                <Header/>
                <div className="main w3-row w3-border">

                    <VisualizationsMenu visualizations={this.state.visualizations}/>

                    {/*<div className="menu w3-col m1 default-primary-color col-stretch">*/}

                        {/*/!*<div className="v-menu-item text-primary-color selectable v-menu-item-chosen">*!/*/}
                            {/*/!*<div className="w3-cell-middle w3-center">*!/*/}
                                {/*/!*<i className="material-icons md-36">timeline</i>*!/*/}
                                {/*/!*<div>Timeline</div>*!/*/}
                            {/*/!*</div>*!/*/}
                        {/*/!*</div>*!/*/}

                        {/*/!*<div className="v-menu-item text-primary-color selectable">*!/*/}
                            {/*/!*<div className="w3-cell-middle w3-center">*!/*/}
                                {/*/!*<i className="material-icons md-36">grain</i>*!/*/}
                                {/*/!*<div>AQI</div>*!/*/}
                            {/*/!*</div>*!/*/}
                        {/*/!*</div>*!/*/}

                    {/*</div>*/}

                    <div className="options w3-col m2 dark-primary-color w3-center w3-border-right w3-border-left col-stretch">

                        <div className="text-primary-color">
                            <OptionsTitle title={'time options'}/>
                            <div>
                                from and to schedueling
                            </div>
                        </div>

                        <div className="text-primary-color">

                            <OptionsTitle title={'pollutant options'}/>
                            <PollutantBoard pollutants={this.state.pollutants}/>

                        </div>


                        <div className="text-primary-color">
                            <OptionsTitle title={'station options'}/>
                            {/*<StationsList stations={this.state.stations}/>*/}
                            <StationsList2/>
                        </div>
                    </div>

                    <div className="presentation w3-col m9 col-stretch secondary-text-color">

                        <div className="w3-row">

                            <div className="w3-col m12 chosen-list">

                                <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
                                    <div className="badge-text">something</div>
                                    <button className="w3-button w3-circle light-primary-color">x</button>
                                </div>

                                <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
                                    <div className="badge-text">something</div>
                                    <button className="w3-button w3-circle light-primary-color">x</button>
                                </div>

                                <div className="w3-bar w3-cell-middle w3-right-align chosen-badge">
                                    <div className="badge-text">something</div>
                                    <button className="w3-button w3-circle light-primary-color">x</button>
                                </div>

                            </div>


                            <div className="w3-col m7 w3-container">
                                <div className="graph w3-card-2 w3-section white">one card</div>
                                <div className="graph w3-card-2 w3-section white">two card</div>
                            </div>

                            <div className="gis w3-col m5 w3-container">
                                <div className="w3-card-2 w3-section white">GIS</div>
                            </div>

                        </div>

                    </div>

                </div>

                <Footer/>

            </div>
        );
    }
}