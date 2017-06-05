import {combineReducers} from 'redux';
import StationReducer from './reducer_stations';
import GraphReducer from  './reducer_graphs';

const rootReducer = combineReducers(
    {
        stations: StationReducer,
        graphs: GraphReducer
    }
);

export default rootReducer;