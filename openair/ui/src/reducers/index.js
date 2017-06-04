import {combineReducers} from 'redux';
import StationReducer from './reducer_stations';

const rootReducer = combineReducers(
    {
        stations: StationReducer
    }
);

export default rootReducer;