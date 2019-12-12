import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

function Cart(props) {

  const [totoalITem, setTotalItems] = useState(1)

  useEffect(() => {
    setTotalItems(props.selectedProductList ? props.selectedProductList.length : 0)
    console.log(props.selectedProductList)
  })

  console.log(props)
    return (
      <div class="container">
      <Link to='/summary' className='btn btn-link text-white'><FontAwesomeIcon icon={faShoppingCart} /></Link>
      { totoalITem ? <span class="badge badge-notify">{totoalITem}</span> : ''}
      </div>
    )
  }


const mapStateToProps = function(state) {
  return {
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(Cart);