import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import SpinnerButton from "./../component/SpinnerButton";

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
  }
  componentDidMount(){
    console.log(this.props)

    let calculateProduct = this.props && this.props.selectedProductList ? this.props.selectedProductList : []


  
  console.log(calculateProduct)
  
  
  const calculatedPrice = calculateProduct
    .map(item => item.price)
    .reduce((prev, curr) => prev + curr, 0);
  
  const calculateDiscount =   calculateProduct.map(item => item.discount)
  .reduce((prev, curr) => prev + curr, 0);
  
  
    console.log(calculatedPrice)

    this.setState({
      selectedProductList: this.props.selectedProductList,
      calculateProduct: calculateProduct,
      calculatedPrice: calculatedPrice,
      calculateDiscount: calculateDiscount
    })
  }

  handleRemoveItem(id){
    console.log(id)
    let listItem = this.state.selectedProductList
    let filteredProduct = listItem.filter(product => product.id !== id);
    console.log(filteredProduct)
    this.setState({
      selectedProductList: filteredProduct
    })
  }

  render(){
  const onChangeUsername = (value) => {
    console.log(value)
  }

  console.log(this.state.selectedProductList)

  let calculateProduct =  this.state.selectedProductList ? this.state.selectedProductList : []


  
  console.log(calculateProduct)
  
  
  const calculatedPrice = calculateProduct
    .map(item => item.price)
    .reduce((prev, curr) => prev + curr, 0);
  
  const calculateDiscount =   calculateProduct.map(item => item.discount)
  .reduce((prev, curr) => prev + curr, 0);
  
  
    console.log(calculatedPrice)



  return (
    <div className="summary">
      <div className="container">
        <div className="row pt-3">
          <div className="col-12">
            <Link to="/">Order page</Link>
          </div>
        </div>

        <div className="row">
          <div class="col-8">
            <div className="row">
              <div className="col-12">
                <table id="cart" class="table table-hover table-condensed border-bottom">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.selectedProductList ? this.state.selectedProductList.map((item) => (
                    <tr>
                      <td data-th="Product">
                        <div class="row border d-flex align-items-center p-2" >
                          <div class="col-2">
                            <img />
                          </div>
                          <div class="col-8">
                            <p className='m-0'>{item.name}</p>
                          </div>
                          <div class="col-2">
                           <button className="btn btn-link" onClick={this.handleRemoveItem.bind(this, item.id)} >x</button>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price">
                        <SpinnerButton onChange = {onChangeUsername} />
                      </td>
                      <td data-th="Subtotal" class="text-center">
                        {item.price}
                      </td>
                    </tr>
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
              <div className="w-100 p-2 bg-light d-flex"><div className='flex-fill'>Total</div> <div className='flex-fill'>:</div> <div className='flex-fill text-right'>${calculatedPrice ? calculatedPrice - calculateDiscount : 0}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  }
}


const mapStateToProps = function(state) {
  return {
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(OrderSummary);