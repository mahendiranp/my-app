import React, { Component } from "react";
import SpinnerButton from "./SpinnerButton";

import ImagePlaceholder from './../component/ImagePlaceholder'

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        calculateTotal: 0,
        price: 0
    }
    this.handleSpinnerButton = this.handleSpinnerButton.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }
  componentDidMount(){
    this.setState({
      price: this.props.data.price,
      calculateTotal: this.props.data.totalCost
    })
  }
  handleSpinnerButton(value){
      console.log(value)
      this.setState({
        calculateTotal: this.state.price * value
      })
      let changeData = this.props.data;
      changeData['totalItems'] = value
      changeData['totalCost'] = this.state.price * value
      this.props.onDataChange(changeData)
  }

  handleRemoveItem(value){
    this.props.removeItem(value)
  }
  render() {
      console.log(this.state.calculateTotal)
      console.log(this.props)
    return (
      <tr>
        <td data-th="Product">
          <div class="row border d-flex align-items-center p-2 products">
            <div class="image">
              <ImagePlaceholder url={this.props.data.img_url} />
            </div>
            <div class="flex-grow-1 desc">
              <p className="m-0">{this.props.data.name}</p>
            </div>
            <div class="link">
              <button className="btn btn-link" onClick={this.handleRemoveItem.bind(this, this.props.data.id)}>x</button>
            </div>
          </div>
        </td>
        <td data-th="Price">
          <SpinnerButton value={this.props.data.totalItems} onChange ={this.handleSpinnerButton} />
        </td>
        <td data-th="Subtotal" class="text-center font-weight-bold">
          ${this.state.calculateTotal}
        </td>
      </tr>
    );
  }
}

export default ProductList;
