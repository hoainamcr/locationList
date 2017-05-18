import React, {Component} from "react";
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { loadData, delData, isUpdate, clickLocation } from '../actions';

let FontAwesome = require('react-fontawesome');
import {
    Button
} from 'muicss/react';

class ListItem extends Component {

    removeLocal() {
        let {id, handleRemove, index} = this.props;
        handleRemove(id, index);
    }

    editLocal() {
        let {id, handleEdit, index} = this.props;
        handleEdit(id, index);
    }

    clickLocation() {
        let {id, handleClick, index} = this.props;
        handleClick(index);
    }

    render() {
        return (
            <li id={this.props.id} onClick={this.clickLocation.bind(this)}>
                {this.props.children}
                <div className="gr-btn">
                    <Button onClick={this.editLocal.bind(this)} className="mui-btn mui-btn--small mui-btn--primary">
                        <FontAwesome name='pencil-square-o' />
                    </Button>
                    <Button onClick={this.removeLocal.bind(this)} className="mui-btn mui-btn--small mui-btn--danger" >
                        <FontAwesome name='trash' />
                    </Button>
                </div>
            </li>

        )
    }
}

class ListAdd extends Component {

    componentWillMount(){
        this.props.loadData();
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
    }

    edit(id, index){
        this.props.isUpdate(id, index, true);
        document.getElementById('error-mess').innerText='';
    }

    remove(id, index){
        this.props.delData(id, index);
    }

    clLocation(index){
        this.props.clickLocation(index);
    }

    render () {
        return (
                <Scrollbars
                    className="listScroll"
                >
                    <ul>
                        {this.props.data.map((e, i) => <ListItem handleEdit={this.edit.bind(this)} handleRemove={this.remove.bind(this)} handleClick={this.clLocation.bind(this)} key={i} id={e._id} index={i}>{e.street + ', ' + e.ward + ', ' + e.District + ', ' + e.city}</ListItem>)}
                    </ul>
                </Scrollbars>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.list,
        isEdit: state.isEdit
    }
};

export default connect(mapStateToProps, {
    loadData, delData, isUpdate, clickLocation
})(ListAdd);