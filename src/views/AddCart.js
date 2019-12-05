import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ImagePlaceholder from "./../component/ImagePlaceholder";
import Product from "./../component/Product";

import { getData } from "./../action/GetCart";
import { setSelectedProduct } from "./../action/SelectedProduct";

class AddCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem : [],
      selectedProduct: []
    }
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getData());
  }
  onChangeValue(val) {
    let selectedId = this.state.selectedItem
    let sproductList = this.props.product
    if(!selectedId.indexOf(val)){
      var index = selectedId.indexOf(val);
      if (index !== -1) selectedId.splice(index, 1);
      console.log(selectedId)
    } else {
      selectedId.push(val)
    }
    console.log(selectedId)
    let unique = [...new Set(selectedId)];
    console.log(unique);
    let filteredProductList = []
    let filterValue = unique.map((item) => {
      let selectedItem = sproductList.find((product) => product.id === item);
      filteredProductList.push(selectedItem)
    });
    console.log(filteredProductList)
    this.props.dispatch(setSelectedProduct(filteredProductList))
    this.setState({
      selectedItem: unique,
      selectedProduct: filteredProductList
    })
  }
  render() {

    console.log(this.state.selectedProduct)


    return (
      <div className="App">
        <div class="container pt-3">
          <div class="row">
            <div class="col-4">All items</div>
            <div class="col-4">
              {this.state.selectedProduct.length ? <div class="alert alert-success" role="alert">
                {this.state.selectedProduct.map((item) => (<span>{item.name}, </span>))} is added cart.
              </div> : ''}
            </div>
            <div class="col-4 float-right">
            <Link to="/summary" class="btn btn-primary  float-right">
              Go to Cart
            </Link>
          </div>
          </div>
        </div>
        <div class="container">
          <div className="row">
            {this.props.product
              ? this.props.product.map(item => (
                  <div key={item.id} className="col-sm-6 col-md-6 col-xl-3 py-2 position-relative">
                    <div className="card">
                      <div className="card-header bg-white text-center">
                        <ImagePlaceholder url={item.img_url} />
                      </div>
                      <div className="card-body bg-light p-2 ">
                      <h5 className="card-title">{item.name}</h5>
                      <div className="d-flex w-100">
                        {item.discount ? (
                          <div
                            class="pr-2 bd-highlight"
                            style={{ color: "red", textDecoration: "line-through" }}
                          >
                            <span style={{ color: "#000" }}>${item.price}</span>
                          </div>
                        ) : (
                          <div class="pr-2 bd-highlight font-weight-bold">${item.price}</div>
                        )}
                        {item.discount ? (
                          <div class=" bd-highlight font-weight-bold">${item.price - item.discount}</div>
                        ) : (
                          ""
                        )}
                        <div class="ml-auto p-2 bd-highlight">
                          <button
                            type="button"
                            class="btn btn-outline-primary"
                            onClick={this.onChangeValue.bind(this, item.id)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                    {item.discount ? (
                      <div
                        className="position-absolute alert alert-success px-2 py-1"
                        style={{ left: "16px", top: "15px" }}
                      >
                        {item.discount} % Off
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              : "No data found"}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    product: state.productlistData.data
  };
};

export default connect(mapStateToProps)(AddCart);
