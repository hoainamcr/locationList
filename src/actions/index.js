import * as types from './types';

export const loadData = ()=>{
    return (dispatch) => {
        fetch('http://localhost:3000/api/locationlist')
            .then(response => response.json())
            .then(response => {
                dispatch ({
                    type: types.LOAD_DATA,
                    payload: response
                });
            })
            .catch(error => {
                console.log('error: ', error.message);
            })
    }

};

export const addData = (data)=>{

    return (dispatch) => {
        let insertData =  JSON.stringify({
            street: data.street,
            ward: data.ward,
            District: data.District,
            city: data.city,
            country: data.country,
            location: data.locationPs
        });
        fetch('http://localhost:3000/api/addlocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: insertData
        })
            .then(response => response.json())
            .then(response => {
                dispatch ({
                    type: types.ADD_DATA,
                    payload: response
                });
            })
            .catch(error => console.log(error.message));
    }

};

export const delData = (id, index)=>{
    return (dispatch) => {
        fetch('http://localhost:3000/api/deletelocation/'+id, {
            method: 'DELETE'
        })
            .then(response => {
                console.log('Delete location success!');
                dispatch ({
                    type: types.DELETE_DATA,
                    payload: index
                });
            })
            .catch(error => console.log(error.message));
    }
};


export const isUpdate = (id, index, tg = false) => {
    return (dispatch) => {
        dispatch ({
            type: types.EDIT_DATA,
            id: id,
            index: index,
            tg: tg
        });
    }
};

export const clickLocation = (index) => {
    return (dispatch) => {
        dispatch ({
            type: types.CLICK_LOCATION,
            index: index
        });
    }
};

export const oneData = (id, index)=>{
    return (dispatch) => {
        fetch('http://localhost:3000/api/location/'+id)
            .then(response => response.json())
            .then(response => {
                dispatch ({
                    type: types.ONE_DATA,
                    dataLoad: response
                });
            })
            .catch(error => {
                console.log('error: ', error.message);
            })
    };
};

export const updateData = (id, data)=>{
    return (dispatch) => {
        let insertData =  JSON.stringify({
            street: data.street,
            ward: data.ward,
            District: data.District,
            city: data.city,
            country: data.country,
            location: data.locationPs
        });
        fetch('http://localhost:3000/api/updatelocation/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: insertData
        })
            .then(response => {
                console.log('Update location success!');
                dispatch ({
                    type: types.UPDATE_DATA,
                    payload: response
                });
            })
            .catch(error => console.log(error.message));
    }

};
