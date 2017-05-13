import React, {Component} from "react";
import {connect} from 'react-redux';
import {addData, isUpdate, updateData} from '../actions';
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
        this.props.addData(this.state);
    }

    cancelEdit(e) {
        e.preventDefault();
        this.props.isUpdate();
    }

    updateEdit(e){
        e.preventDefault();
        this.props.updateData(this.props.isEdit[1], this.state);
        this.props.isUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isEdit[0]){
            this.setState({
                street: this.props.data[this.props.isEdit[2]].street,
                ward: this.props.data[this.props.isEdit[2]].ward,
                District: this.props.data[this.props.isEdit[2]].District,
                city: this.props.data[this.props.isEdit[2]].city,
                country: 'Việt Nam'
            });
        }else{
            this.setState({
                street: '',
                ward: '',
                District: '',
                city: '',
                country: 'Việt Nam'
            });
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
                    <Button color="primary">Save</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.isEdit)
    return {
        data: state.list,
        isEdit: state.isEdit
    }
};

export default connect(mapStateToProps, {
    addData, isUpdate, updateData
})(FormBox);