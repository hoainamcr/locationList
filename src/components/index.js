import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from '../store';
import FormBox from "./form";
import ListAdd from "./list";
import Map from "./map";
import ExportCSV from "./ExportCSV";

const css = require('../css/styles.scss');

class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const location = {
            lat: 10.7979865,
            lng: 106.7511866
        };

        const markers = [
            {
                position: {
                    lat: 10.7979865,
                    lng: 106.7511866
                }
            },
            {
                position: {
                    lat: 10.774690,
                    lng: 106.676430
                }
            },
            {
                position: {
                    lat: 10.766627,
                    lng: 106.693926
                }
            },
            {
                position: {
                    lat: 10.824457,
                    lng: 106.697922
                }
            },
            {
                position: {
                    lat: 10.820572,
                    lng: 106.683667
                }
            },
            {
                position: {
                    lat: 10.778103,
                    lng: 106.701758
                }
            }
        ];

        return(
            <Provider store = { store } >
                <div>
                    <div id="sidebar">
                        <FormBox />
                        <ListAdd />
                        <ExportCSV />
                    </div>
                    <div id="content" className="mui-container-fluid">
                        <Map
                            center={location}
                            markers={markers}
                        />
                    </div>
                </div>
            </Provider>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);
