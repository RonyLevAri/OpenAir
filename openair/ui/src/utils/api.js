const BASE_END_POINT = 'http://localhost:8000/';

export function getStations() {
    return fetch(BASE_END_POINT + 'timeline/stations')
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}

export function getMeasurements() {
    return fetch(BASE_END_POINT + 'timeline/stations')
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}
