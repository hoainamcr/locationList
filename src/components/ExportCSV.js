import React, {Component} from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import {
    Container
} from 'muicss/react';
import {connect} from 'react-redux';
import { loadData } from '../actions';

class ExportCSV extends Component {

    componentWillMount(){
        this.props.loadData();
    }

    render (){
        const CSVdata = this.props.data;
        return(
            <Container className="gr-btn-ex">
                <CSVLink
                    data={CSVdata}
                    filename={"location-list.csv"}
                    className="mui-btn mui-btn--primary"
                    target="_blank">
                    Export List To CSV File
                </CSVLink>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.list
    }
};

export default connect(mapStateToProps, {loadData})(ExportCSV);