import React, {Component} from "react";
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { loadData, delData, isUpdate } from '../actions';

var FontAwesome = require('react-fontawesome');
import {
    Button
} from 'muicss/react';

class ListItem extends Component {

    removeLocal() {
        var {id, handleRemove, index} = this.props;
        handleRemove(id, index);
    }

    editLocal() {
        var {id, handleEdit, index} = this.props;
        handleEdit(id, index);
    }

    render() {
        return (
            <li id={this.props.id}>
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

    render () {
        return (
                <Scrollbars
                    className="listScroll"
                >
                    <ul>
                        {this.props.data.map((e, i) => <ListItem handleEdit={this.edit.bind(this)} handleRemove={this.remove.bind(this)} key={i} id={e._id} index={i}>{e.street + ', ' + e.ward + ', ' + e.District + ', ' + e.city}</ListItem>)}
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
    loadData, delData, isUpdate
})(ListAdd);