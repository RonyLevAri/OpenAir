import React from 'react';
import 'whatwg-fetch'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "stations": [],
            "pollutants": []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/timeline/stations')
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
        console.log('In component did mount');
    }

    render() {
        console.log('In render');
        return (
            <div>
                <h1>Hello World and me!!!</h1>
            </div>
        );
    }
}