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
        let dataEP = [['Street', 'Ward', 'District', 'City', 'Country']]
        this.props.data.map((e, i) => {
            dataEP.push([e.street, e.ward, e.District, e.city, e.country]);
        })

        const CSVdata = dataEP;
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