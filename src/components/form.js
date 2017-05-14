import React, {Component} from "react";
import {connect} from 'react-redux';
import {addData, isUpdate, updateData, loadData} from '../actions';
import {
    Container,
    Button,
    Form,
    Input,
    Row,
    Col
} from 'muicss/react';

class FormBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            street: '',
            ward: '',
            District: '',
            city: '',
            country: 'Việt Nam'
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
            })
            document.getElementById('error-mess').innerText='';
        }else{
            document.getElementById('error-mess').innerText='Please fill in all information!';
        }
    }

    cancelEdit(e) {
        e.preventDefault();
        this.props.isUpdate();
        document.getElementById('error-mess').innerText='';
    }

    updateEdit(e){
        e.preventDefault();
        if(this.state.street && this.state.ward && this.state.District && this.state.city){
            this.props.updateData(this.props.isEdit[1], this.state);
            this.props.isUpdate();
            this.props.loadData();
            document.getElementById('error-mess').innerText='';
        }else{
            document.getElementById('error-mess').innerText='Please fill in all information!';
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.isEdit);
        if(nextProps.isEdit && nextProps.isEdit[0]){
            this.setState({
                street: this.props.data[nextProps.isEdit[2]].street,
                ward: this.props.data[nextProps.isEdit[2]].ward,
                District: this.props.data[nextProps.isEdit[2]].District,
                city: this.props.data[nextProps.isEdit[2]].city,
                country: 'Việt Nam'
            });
        }else{
            this.setState({
                street: '',
                ward: '',
                District: '',
                city: '',
                country: 'Việt Nam'
            })
        }
    }

    render() {
        if (this.props.isEdit[0]) {
            return (
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <legend>Location</legend>
                        <Row>
                            <Col xs="6">
                                <Input
                                    label="Street"
                                    floatingLabel={true}
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
                                    name="city"
                                    className=""
                                    onChange={this.onChange}
                                    value={this.state.city}
                                />
                            </Col>
                        </Row>
                        <div id="error-mess"></div>
                        <Button onClick={this.updateEdit.bind(this)} color="primary">Update</Button>
                        <Button onClick={this.cancelEdit.bind(this)} color="danger">Cancel</Button>
                    </Form>
                </Container>
            );
        }
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <legend>Location</legend>
                    <Row>
                        <Col xs="6">
                            <Input
                                label="Street"
                                floatingLabel={true}
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
                                name="city"
                                className=""
                                onChange={this.onChange}
                                value={this.state.city}
                            />
                        </Col>
                    </Row>
                    <div id="error-mess"></div>
                    <Button color="primary">Save</Button>
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