import { graphSelectionCompleted } from './common';

const BASE_END_POINT = 'http://localhost:8000/';

export function getStations() {
    return fetch(BASE_END_POINT + 'timeline/stations')
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}

export function getMeasurements(graphSelections) {

    if (!graphSelectionCompleted(graphSelections))
        return;

    let query = {
        station: graphSelections.station.id,
        pollutant: graphSelections.pollutant.id
    };

    console.log("querying: ", query);

    return fetch(BASE_END_POINT + 'timeline/measurements/?station=' + query.station.toString() + '&pollutant=' + query.pollutant.toString())
        .then(res => {
            console.log('im back');
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
}
