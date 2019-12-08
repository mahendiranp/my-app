import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ImagePlaceholder from "./../component/ImagePlaceholder";
import Product from "./../component/Product";
import discountCalculate from "./../component/discountCalculate";

import { getData } from "./../action/GetCart";
import { setSelectedProduct } from "./../action/SelectedProduct";



import './../style/AddCart.scss'

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
    if(!this.props.product){
    this.props.dispatch(getData());
    }
    if(this.props.selectedProductList){
      this.setState({selectedProduct: this.props.selectedProductList})
    }
  }
  onChangeValue(val) {
    let productList = this.props.product
    let selectedProducts = []
    let filterProduct = productList.find(x => x.id == val);    
    let isPresent = this.state.selectedProduct.some(function(el){ return el.id === val});
    if(isPresent) {

      let findIndex = this.state.selectedProduct.findIndex((data) =>  data.id ===  val)

      let propertyData = this.state.selectedProduct

      let data = propertyData.findIndex((data) => { 
        if(data.id ===  val) {
          let total = discountCalculate(data.price, data.discount)
          data['totalItems'] = data.totalItems ?  data.totalItems + 1 : 1
          data['totalCost'] = data.totalItems ? data.totalItems * total : total
        }
      
      this.setState({
        selectedProduct: propertyData
      })
      
      })

    } else  {
      let total = discountCalculate(filterProduct.price, filterProduct.discount)

      
      filterProduct['totalItems'] = 1
      filterProduct['totalCost'] =  parseInt(total)


      this.setState({
        selectedProduct: [...this.state.selectedProduct, filterProduct]
      })

    }
    

    // this.props.dispatch(setSelectedProduct(filterProduct))
    // let selectedId = this.state.selectedItem
    // let sproductList = this.props.product
    // let selectedProduct = this.props.selectedProductList ? this.props.selectedProductList : null
    // console.log('dddddd')
    // console.log(this.props.selectedProductList)

    // let selectedCard = selectedProduct && selectedProduct.map((item) => {
    //   console.log('ssss')
    //   console.log(item)
    //   selectedId.push(item.id)
    // })
    
    // if(!selectedId.indexOf(val)){
    //   var index = selectedId.indexOf(val);
    //   if (index !== -1) selectedId.splice(index, 1);
    //   console.log(selectedId)
    // } else {
    //   selectedId.push(val)
    // }
    // console.log(selectedId)
    // let unique = [...new Set(selectedId)];
    // console.log(unique);
    // let filteredProductList = []
    // let filterValue = unique.map((item) => {
    //   let selectedItem = sproductList.find((product) => product.id === item);
    //   filteredProductList.push(selectedItem)
    // });
    // console.log(filteredProductList)
    // console.log('hello')
    // this.props.dispatch(setSelectedProduct(filteredProductList))
    // this.setState({
    //   selectedItem: unique,
    //   selectedProduct: filteredProductList
    // })
  }
  render() {

    return (
      <div className="App">
        <div className="container pt-3">
          <div className="row">
            <div className="col-4">All items</div>
            <div className="col-4">
              {this.state.selectedProduct.length ? <div className="alert alert-success" role="alert">
                {this.state.selectedProduct.map((item) => (<span>{item.name}, </span>))} is added cart.
              </div> : ''}
            </div>
            <div className="col-4 float-right">
            <Link to="/summary" onClick={() => {this.props.dispatch(setSelectedProduct(this.state.selectedProduct))}} className="btn btn-primary  float-right">
              Go to Cart
            </Link>
          </div>
          </div>
        </div>
        <div className="container">
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
                      <div className="d-flex w-100 align-items-center">
                        {item.discount ? (
                          <div className="pr-2 bd-highlight  text-lne-through">
                            <span className='color-black'>${item.price}</span>
                          </div>
                        ) : (
                          <div className="pr-2 bd-highlight font-weight-bold">${item.price}</div>
                        )}
                        {item.discount ? (
                          <div className=" bd-highlight font-weight-bold">${discountCalculate(item.price, item.discount)}</div>
                        ) : (
                          ""
                        )}
                        <div className="ml-auto bd-highlight">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.onChangeValue.bind(this, item.id)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                    {item.discount ? (
                      <div className="position-absolute discout-info px-2 py-1">
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
    product: state.productlistData.data,
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(AddCart);
