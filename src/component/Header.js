import React, {Component} from 'react'
import { connect } from "react-redux";


import './../style/Header.scss'

import Searchbar from './Searchbar'
import Cart from './Cart'


class Header extends Component {
  constructor(props){
    super(props)
  }
  render(){
    console.log(this.props)
    return (
      <div className="  header  ">
        <div className='container-fluid'>
        <div className='d-flex'>
        <div className='mr-auto'>React Documentation</div>
        <Searchbar />
        <Cart />
        </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(Header);
