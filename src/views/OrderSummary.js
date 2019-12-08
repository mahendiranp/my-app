import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ProductList from "./../component/ProductList";
import discountCalculate from "./../component/discountCalculate";

import { setSelectedProduct } from "./../action/SelectedProduct";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons'

import PlaceHolder from './../assets/150.png';

import './../style/Summary.scss'

class OrderSummary extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      calculateProduct: 0,
      calculatedPrice: 0,
      calculateDiscount: 0,
      selectedProductList : []
    }
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleOnProductChange = this.handleOnProductChange.bind(this)
  }
  componentDidMount(){
    
    console.log(this.props)

    let calculateProduct = this.props && this.props.selectedProductList ? this.props.selectedProductList : []  
    
    const calculatedPrice = calculateProduct
    .map(item => item.totalCost)
    .reduce((prev, curr) => prev + curr, 0);
    
    const calculateDiscount =   calculateProduct.map(item => item.discount).reduce((prev, curr) => prev + curr, 0);
    
    this.setState({
      selectedProductList: this.props.selectedProductList,
      calculateProduct: calculateProduct,
      calculatedPrice: calculatedPrice,
      calculateDiscount: calculateDiscount
    })
  }

  handleRemoveItem(id){
    let listItem = this.state.selectedProductList
    let filteredProduct = listItem.filter(product => product.id !== id);
    this.props.dispatch(setSelectedProduct(filteredProduct))
    this.setState({
      selectedProductList: filteredProduct
    })
  }

  handleOnProductChange(value){

    let selectedData = this.state.selectedProductList

    let findProduct = this.state.selectedProductList.findIndex((info) => info.id === value.id)

    selectedData[findProduct] = value

    this.setState({
      selectedProductList : selectedData
    })

  }

  render(){

    console.log(this.props)
  let calculateProduct =  this.state.selectedProductList ? this.state.selectedProductList : []  
  
  const calculatedPrice = calculateProduct
    .map(item => item.totalCost)
    .reduce((prev, curr) => prev + curr, 0);
  
  const calculateDiscount =   calculateProduct.map(item => item.discount)
  .reduce((prev, curr) => prev + curr, 0);

  return (
    
    <div className="summary">
      <div className="container">
        <div className="row pt-3 mb-3">
          <div className="col-12">
            <Link to="/"><FontAwesomeIcon icon={faChevronLeft} /></Link>  Order page
          </div>
        </div>

        {this.state.selectedProductList ? <div className="row">
          <div class="col-8">
            <div className="row">
            <div className="col-12">
                <table id="cart" class="table table-hover table-condensed border-bottom">
                  <thead>
                    <tr>
                      <th style={{width: '70%'}}>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.selectedProductList ? this.state.selectedProductList.map((item) => (
                    <ProductList placeHoder={PlaceHolder} onDataChange={this.handleOnProductChange} removeItem={this.handleRemoveItem} key={item.id} data={item} />
                  )): ''}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div className="d-flex flex-column border priceDetails">
              <div className="w-100 p-2">Total</div>
              <div className="w-100 p-2 d-flex"><div className='flex-fill'>Items ({this.state.selectedProductList ? this.state.selectedProductList.length : 0})</div><div className='flex-fill'>:</div>  <div className='flex-fill text-right'>${calculatedPrice || ''}</div></div>
              <div className="w-100 p-2 d-flex"><div className='flex-fill'>Discount</div><div className='flex-fill'> : </div> <div className='flex-fill text-right'>{calculateDiscount || 0}</div></div>
              <div className="w-100 p-2 d-flex"><div className='flex-fill'>Type Discount</div> <div className='flex-fill'>:</div> <div className='flex-fill text-right'>100</div></div>
              <div className="w-100 p-2 bg-light d-flex"><div className='flex-fill'>Total</div> <div className='flex-fill'>:</div> <div className='flex-fill text-right'>${calculatedPrice ? discountCalculate(calculatedPrice, calculateDiscount)  : 0}</div></div>
            </div>
          </div>
        </div> : 'Cart is empty' }
      </div>
    </div>
  );}
}


const mapStateToProps = function(state) {
  return {
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(OrderSummary);