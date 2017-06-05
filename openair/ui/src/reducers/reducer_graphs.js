import { ADD_GRAPH, DELETE_GRAPH } from '../actions/action_types';

function graphReducer(state = [], action) {
    switch (action.type) {
        case ADD_GRAPH:
            return [...state, {key: action.numGraphs + 1, isChosen: true, isGraph: true}]
        case DELETE_GRAPH:
            return state.filter(graph => {
                return (graph.key !== action.graphKey);
            });
        default:
            return state
    }
}

export default graphReducer;