import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign} from '@fortawesome/free-solid-svg-icons'

import ImagePlaceholder from "./../component/ImagePlaceholder";
import Product from "./../component/Product";
import discountCalculate from "./../component/discountCalculate";
import Filter from "./../component/Filter";
import Sorting from "./../component/Sorting";

import { getData } from "./../action/GetCart";
import { setSelectedProduct } from "./../action/SelectedProduct";



import './../style/AddCart.scss'

class AddCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem : [],
      selectedProduct: [],
      products: []
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.hanldeFilter = this.hanldeFilter.bind(this)
    this.handleSorting = this.handleSorting.bind(this)
  }

  hanldeFilter(value) {
    console.log(value)
    let productList = this.props.product.filter((item) => item.price > value.min && item.price < value.max)
    console.log(productList)
    this.setState({products : productList})
  }

  handleSorting(value){
    this.setState({products : value})
  }

  componentDidMount() {
    if(!this.props.product){
    this.props.dispatch(getData());
    }

    if(this.props.selectedProductList){
      this.setState({selectedProduct: this.props.selectedProductList})
    }
  }

  componentDidUpdate(prevProps){
    console.log('fgfdddddddd')
    if(this.props.product !== prevProps.product){
      console.log('dddddddddd')
      this.setState({products : this.props.product})
    }
    if(this.props.selectedProductList !== prevProps.selectedProductList){
      console.log('dddddddddddddddddddddd')
      this.setState({selectedProduct: this.props.selectedProductList})
    }
  }
  onChangeValue(val) {
    let productList = this.props.product
    let selectedProducts = this.props.selectedProductList ?  this.props.selectedProductList : []
    let filterProduct = productList.find(x => x.id == val);    
    let isPresent = this.state.selectedProduct.some(function(el){ return el.id === val});
    let selectedData = []
    if(isPresent) {

      let findIndex = this.state.selectedProduct.findIndex((data) =>  data.id ===  val)

      let propertyData = this.props.product

      let data = propertyData.findIndex((data) => { 
        if(data.id ===  val) {
          let total = discountCalculate(data.price, data.discount)
          data['totalItems'] = data.totalItems ?  data.totalItems + 1 : 1
          data['totalCost'] = data.totalItems ? data.totalItems * total : total
          return data
        }
      
        selectedProducts.push(data)

        this.props.dispatch(setSelectedProduct(selectedProducts))
      
      })

    } else  {
      let total = discountCalculate(filterProduct.price, filterProduct.discount)

      
      filterProduct['totalItems'] = 1
      filterProduct['totalCost'] =  parseInt(total)

      const propertyData =  filterProduct

      selectedProducts.push(propertyData)

      this.props.dispatch(setSelectedProduct(selectedProducts))


    }

    console.log(selectedProducts)

    this.setState({
      selectedProduct: selectedProducts
    })

    

  }
  render() {

    var maxPriceObj = this.props.product ? Math.max(...this.props.product.map(e => e.price)): ''
    var maxObj = this.props.product ?  this.props.product.find(item => item.price === maxPriceObj) : ''
    let maxPrice = maxObj ? maxObj.price : null


    var minPriceObj = this.props.product ? Math.min(...this.props.product.map(e => e.price)) : ''
    var minObj = this.props.product ? this.props.product.find(item => item.price === minPriceObj): ''
    let minPrice = minObj ? minObj.price : null

    return (
      <div className="App">

        <div className="container-fluid">
        <div className='row flex-xl-nowrap d-flex'>
        <div className='col-md-3 col-xl-2 bd-sidebar'>
        <Filter max={maxPrice} min={minPrice}  filterSubmit = {this.hanldeFilter} /></div>
        <div className='col-md-9 col-xl-10 py-md-3 pl-md-5 bd-content'>
          <div className='row'>
          <div className='col-12'><Sorting data={this.state.products ? this.state.products : ''} onClick={this.handleSorting}/></div>
          </div>
          <Link to="/summary" onClick={() => {this.props.dispatch(setSelectedProduct(this.state.selectedProduct))}} className="btn btn-primary  float-right">
          Go to Cart
        </Link>

          <div className="row">
            {this.state.products
              ? this.state.products.map(item => (
                  <div key={item.id} className="col-sm-6 col-md-6 col-xl-3 py-2 position-relative">
                    <div className="card">
                      <div className="card-header bg-white text-center">
                        <ImagePlaceholder url={item.img_url} />
                      </div>
                      <div className="card-body bg-light p-2 ">
                      <h5 className="card-title">{item.name}</h5>
                      <div className="d-flex w-100 align-items-cente py-3">
                        {item.discount ? (
                          <div className='d-flex w-100'>
                          <div className=" bd-highlight font-weight-bold"><FontAwesomeIcon icon={faRupeeSign} />{discountCalculate(item.price, item.discount)}</div>
                          <div className="pr-2 bd-highlight text-lne-through ml-2">
                            <span className='color-black'><FontAwesomeIcon icon={faRupeeSign} />{item.price}</span>
                          </div>
                          <div className="ml-auto discout-info px-2">
                          {item.discount} % Off
                        </div>
                          </div>
  
                        ) : (
                          <div className="pr-2 bd-highlight font-weight-bold"><FontAwesomeIcon icon={faRupeeSign} />{item.price}</div>
                        )}
                        
                        </div>
                        <div className='d-flex justify-content-center'>
                        
                          <button
                            type="button"
                            className="btn btn-warning rounded-pill"
                            onClick={this.onChangeValue.bind(this, item.id)}
                          >
                            Add to cart
                          </button>
                      </div>
                    </div>
                    </div>
                  </div>
                ))
              : "No data found"}
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
    product: state.productlistData.data,
    selectedProductList: state.selectedProduct.productList
  };
};

export default connect(mapStateToProps)(AddCart);
