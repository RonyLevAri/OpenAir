// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/app.jsx';
import '../src/styles/index.scss';
//
// ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import App from './components/app';


ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>, document.getElementById('app')
);
