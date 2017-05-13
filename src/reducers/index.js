import { combineReducers } from 'redux';
import * as types from '../actions/types';

const INITIAL = [];
var listLocation = (state = INITIAL, action ) => {
    switch (action.type){
        case types.LOAD_DATA:
            return action.payload;
        case types.ADD_DATA:
            return [...state, action.payload];
        case types.DELETE_DATA:
            return state.filter((e, i) => i != action.payload);
        case types.UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
};

var isEditing = (state = false, action) => {
    switch (action.type){
        case types.EDIT_DATA:
            return [action.tg, action.id, action.index]
        default:
            return state
    }
}

export default combineReducers({
    list: listLocation,
    isEdit: isEditing
})
