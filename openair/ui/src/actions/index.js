import { ADD_GRAPH } from './action_types';
import { SELECT_POLLUTANT } from './action_types';
import { SELECT_STATION } from './action_types';

export function createGraph() {
    return {
        type: ADD_GRAPH
    };
}

export function selectPollutant(stationId) {
    return {
        type: SELECT_POLLUTANT,
        id: stationId
    };
}

export function selectStation(stationId) {
    return {
        type: SELECT_STATION,
        id: stationId
    };
}
