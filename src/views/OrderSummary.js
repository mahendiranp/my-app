import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import SpinnerButton from "./../component/SpinnerButton";

function OrderSummary(props) {
  const onChangeUsername = (value) => {
    console.log(value)
  }
  console.log(props)
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/">Order</Link>
          </div>
        </div>

        <div className="row">
          <div class="col-8">
            <div className="row">
              <div className="col-12">
                <table id="cart" class="table table-hover table-condensed">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {props.selectedProductList && props.selectedProductList.map((item) => (
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
                           <button className="btn btn-link">x</button>
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
                  ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div className="d-flex flex-column border">
              <div className="w-100">Total</div>
              <div className="w-100">Items (4) : 100</div>
              <div className="w-100">Discount : 100</div>
              <div className="w-100">Type Discount : 100</div>
              <div className="w-100 bg-light">Total : 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = function(state) {
  return {
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(OrderSummary);