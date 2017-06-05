function createStore(reducer, initialState = []) {

    let state = initialState;
    let subscribers = [];

    function getState() {
        return state;
    }

    function subscribe(callback) {
        subscribers.push(callback);
    }

    function dispatch(action) {
        state = reducer(state, action);
        subscribers.forEach(cb => cb());

    }

    return {getState, subscribe, dispatch};
}

let reducer = require('../reducers/reducer_graphs');
let store = createStore(reducer, [{key: 2, isChosen: false, isGraph: true}]);

console.log(store.getState());

