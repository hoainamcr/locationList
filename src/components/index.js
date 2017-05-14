import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from '../store';
import FormBox from "./form";
import ListAdd from "./list";
import Map from "./map";

const css = require('../css/styles.scss');

class App extends Component {
    render(){
        return(
            <Provider store = { store } >
                <div>
                    <div id="sidebar">
                        <FormBox {...this.props} />
                        <ListAdd {...this.props} />
                    </div>
                    <div id="content" className="mui-container-fluid">
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
