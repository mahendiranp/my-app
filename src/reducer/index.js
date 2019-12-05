import { combineReducers } from 'redux'

import { REQUEST_DATA, REQUEST_SUCCESS, REQUEST_FAILED } from './../action/GetCart'

import { SET_PRODUCTS} from './../action/SelectedProduct'

function productlistData(state = [], action) {
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, {
          request: true
        })
        case REQUEST_SUCCESS:
        return Object.assign({}, state, {
            data:action.data,
            request: false
        })
        case REQUEST_FAILED:
        return Object.assign({}, state, {
            error: action.error,
            request: false
        })
      default:
        return state
    }
  }

  function selectedProduct(state = [], action) {
    console.log(action)
    switch (action.type) {
        case SET_PRODUCTS:
        return Object.assign({}, state, {
          productList:action.productList,
        })
      default:
        return state
    }
  }

  

const rootReducer = combineReducers({
    productlistData,
    selectedProduct
  })

  export default rootReducer;