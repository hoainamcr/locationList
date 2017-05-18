import React, {Component} from "react";
import { connect } from 'react-redux';
import { addData, isUpdate, updateData, loadData } from '../actions';
import PlacesAutocomplete, {getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import {
    Container,
    Button,
    Form,
    Input,
    Row,
    Col
} from 'muicss/react';

let checkSave = false;
let addressEdit = '';

class PlaceAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            dataAdd: [],
            dataPosition: {}
        };
        this.onChange = (address) => this.setState({ address })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({dataPosition: latLng})

            })
            .catch(error => console.error('Error', error));

        geocodeByAddress(this.state.address)
            .then(results => {
                this.setState({dataAdd: results[0].address_components});
                let {handleBTN} = this.props;
                handleBTN(this.state.dataPosition, this.state.dataAdd);
            })
            .catch(error => console.error('Error', error));
    };

    componentWillReceiveProps(){
        if(checkSave){
            this.setState({address: ''});
            checkSave = false;
        }

        if(addressEdit){
            this.setState({address: addressEdit});
            addressEdit = '';
        }
    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: 'Enter your Address!',
        };

        return (
            <Form
                onSubmit={this.handleFormSubmit}
                className="mui-textfield d-flex justify-content-between form-autocomplete"
            >
                <label htmlFor="">Search In Google Maps</label>
                <PlacesAutocomplete  inputProps={inputProps} />
                <button type="submit" className="mui-btn mui-btn--primary ">pick</button>
            </Form>
        )
    }
}


class FormBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            street: '',
            ward: '',
            District: '',
            city: '',
            country: '',
            locationPs: {},
            enableBTN: true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.street && this.state.ward && this.state.District && this.state.city){
            this.props.addData(this.state);
            this.setState({
                [e.target.name]: ''
            });
            document.getElementById('error-mess').innerText='';
            this.setState({enableBTN: true});
            checkSave = true;
        }else{
            document.getElementById('error-mess').innerText='Please fill in all information!';
        }

    }

    cancelEdit(e) {
        e.preventDefault();
        this.props.isUpdate();
        document.getElementById('error-mess').innerText='';
        this.setState({enableBTN: true});
    }

    updateEdit(e){
        e.preventDefault();
        if(this.state.street && this.state.ward && this.state.District && this.state.city){
            this.props.updateData(this.props.isEdit[1], this.state);
            this.props.isUpdate();
            this.props.loadData();
            document.getElementById('error-mess').innerText='';
            this.setState({enableBTN: true});
            checkSave = true;
        }else{
            document.getElementById('error-mess').innerText='Please fill in all information!';
        }

    }

    pickLocation(latLng, address){
        this.setState({enableBTN: false});
        let count = address.length-1;
        let str = '';
        for (let i = address.length-1; i>=0; i--){
            if((count-0) == i)
                this.setState({country: address[i].long_name});
            if((count-1) == i)
                this.setState({city: address[i].long_name});
            if((count-2) == i)
                this.setState({District: address[i].long_name});
            if((count-3) == i)
                this.setState({ward: address[i].long_name})
        }
        for (let j = 0; j< address.length-4; j++){
            str+=" "+address[j].long_name
        }
        this.setState({
            street: str,
            locationPs:{position: latLng}
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isEdit && nextProps.isEdit[0]){
            this.setState({
                street: this.props.data[nextProps.isEdit[2]].street,
                ward: this.props.data[nextProps.isEdit[2]].ward,
                District: this.props.data[nextProps.isEdit[2]].District,
                city: this.props.data[nextProps.isEdit[2]].city,
                country: this.props.data[nextProps.isEdit[2]].country
            });
            addressEdit =
                this.props.data[nextProps.isEdit[2]].street+', '+
                this.props.data[nextProps.isEdit[2]].ward+', '+
                this.props.data[nextProps.isEdit[2]].District+', '+
                this.props.data[nextProps.isEdit[2]].city+', '+
                this.props.data[nextProps.isEdit[2]].country;
        }else{
            this.setState({
                street: '',
                ward: '',
                District: '',
                city: '',
                country: ''
            })
        }
    }

    render() {
        if (this.props.isEdit[0]) {
            return (
                <Container>
                    <h2>Location</h2>
                    <Row>
                        <Col xs="12">
                            <PlaceAuto handleBTN={this.pickLocation.bind(this)} />
                        </Col>
                    </Row>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col xs="6">
                                <Input
                                    label="Street"
                                    floatingLabel={true}
                                    disabled={true}
                                    name="street"
                                    className=""
                                    onChange={this.onChange}
                                    value={this.state.street}
                                />
                            </Col>
                            <Col xs="6">
                                <Input
                                    label="Ward"
                                    floatingLabel={true}
                                    disabled={true}
                                    name="ward"
                                    className=""
                                    onChange={this.onChange}
                                    value={this.state.ward}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <Input
                                    label="District"
                                    floatingLabel={true}
                                    disabled={true}
                                    name="District"
                                    className=""
                                    onChange={this.onChange}
                                    value={this.state.District}
                                />
                            </Col>
                            <Col xs="6">
                                <Input
                                    label="City"
                                    floatingLabel={true}
                                    disabled={true}
                                    name="city"
                                    className=""
                                    onChange={this.onChange}
                                    value={this.state.city}
                                />
                            </Col>
                        </Row>
                        <div id="error-mess"></div>
                        <Button onClick={this.updateEdit.bind(this)} disabled={this.state.enableBTN} color="primary">Update</Button>
                        <Button onClick={this.cancelEdit.bind(this)} color="danger">Cancel</Button>
                    </Form>
                </Container>
            );
        }
        return (
            <Container>

                <h2>Location</h2>
                <Row>
                    <Col xs="12">
                        <PlaceAuto handleBTN={this.pickLocation.bind(this)} />
                    </Col>
                </Row>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col xs="6">
                            <Input
                                label="Street"
                                floatingLabel={true}
                                disabled={true}
                                name="street"
                                className=""
                                onChange={this.onChange}
                                value={this.state.street}
                            />
                        </Col>
                        <Col xs="6">
                            <Input
                                label="Ward"
                                floatingLabel={true}
                                disabled={true}
                                name="ward"
                                className=""
                                onChange={this.onChange}
                                value={this.state.ward}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Input
                                label="District"
                                floatingLabel={true}
                                disabled={true}
                                name="District"
                                className=""
                                onChange={this.onChange}
                                value={this.state.District}
                            />
                        </Col>
                        <Col xs="6">
                            <Input
                                label="City"
                                floatingLabel={true}
                                disabled={true}
                                name="city"
                                className=""
                                onChange={this.onChange}
                                value={this.state.city}
                            />
                        </Col>
                    </Row>
                    <div id="error-mess"></div>
                    <Button color="primary" disabled={this.state.enableBTN} >Save</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.list,
        isEdit: state.isEdit
    }
};

export default connect(mapStateToProps, {
    addData, isUpdate, updateData, loadData
})(FormBox);