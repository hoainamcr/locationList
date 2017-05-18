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
        return(
            <Provider store = { store } >
                <div>
                    <div id="sidebar">
                        <FormBox />
                        <ListAdd />
                        <ExportCSV />
                    </div>
                    <div id="content" className="">
                        <Map />
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
