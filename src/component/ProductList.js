import React, { Component } from "react";
import SpinnerButton from "./SpinnerButton";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        selectedItem : 1,
        calculateTotal: this.props.data.price
    }
    this.handleSpinnerButton = this.handleSpinnerButton.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }
  handleSpinnerButton(value){
      console.log(value)
      this.setState({
        calculateTotal: this.state.calculateTotal * value
      })
  }

  handleRemoveItem(value){
    this.props.removeItem(value)
  }
  render() {
      console.log(this.state.calculateTotal)
    return (
      <tr>
        <td data-th="Product">
          <div class="row border d-flex align-items-center p-2">
            <div class="col-2">
              <img />
            </div>
            <div class="col-8">
              <p className="m-0">{this.props.data.name}</p>
            </div>
            <div class="col-2">
              <button className="btn btn-link" onClick={this.handleRemoveItem.bind(this, this.props.data.id)}>x</button>
            </div>
          </div>
        </td>
        <td data-th="Price">
          <SpinnerButton onChange ={this.handleSpinnerButton} />
        </td>
        <td data-th="Subtotal" class="text-center">
          {this.state.calculateTotal}
        </td>
      </tr>
    );
  }
}

export default ProductList;
