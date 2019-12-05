import axios from 'axios';

export const REQUEST_DATA = "REQUEST_DATA";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILED = "REQUEST_FAILED";

function requestData(){
    return { type : REQUEST_DATA}
}

function requestSuccess(data){
    return { type : REQUEST_SUCCESS, data:  data}
}

function requestFailed(message){
    return { type : REQUEST_FAILED, message}
}

export function getData(){
    return dispatch => {
        dispatch(requestData());
        axios.get('https://api.myjson.com/bins/qhnfp')
        .then(function (response) {
            console.log(response.data)
            dispatch(requestSuccess(response.data))
          })
          .catch(function (error) {
            console.log(error.message)
            dispatch(requestFailed(error.message))
          })
          .finally(function () {

          });

      };
}