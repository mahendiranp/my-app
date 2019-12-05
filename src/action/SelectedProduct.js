export const SET_PRODUCTS = "SET_PRODUCTS";

function setRequestData(data){
    return { type : SET_PRODUCTS, productList:  data}
}


export function setSelectedProduct(data){
    return dispatch => {
        dispatch(setRequestData(data));
      };
}