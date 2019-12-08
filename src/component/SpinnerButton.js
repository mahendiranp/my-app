import React, { Component } from "react";
class SpinnerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  componentDidMount(){
    this.setState({
      value: this.props.value
    })
  }

  handleIncrement() {
    this.setState({
      value: this.state.value + 1
    });
    this.props.onChange(this.state.value + 1)
  }

  handleDecrement() {
    this.setState({
      value: this.state.value - 1
    });
    this.props.onChange(this.state.value - 1)
  }

  handleValue(e) {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    });
    this.props.onChange(event.target.value)
  }
  render() {
    return (
      <div className="d-flex bd-highlight" style={{ width: "100px" }}>
        <div className="">
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={this.handleIncrement}
          >
            +
          </button>{" "}
        </div>
        <div className="">
          <input
            style={{ width: "30px" }}
            onChange={this.handleValue}
            value={this.state.value}
            type="text"
            className='text-center'
          />
        </div>
        <div className="">
          {this.state.value <= 1 ? (
            <button className="btn btn-link p-0" type="button" disabled>
              -
            </button>
          ) : (
            <button
              className="btn btn-link p-0"
              type="button"
              onClick={this.handleDecrement}
            >
              -
            </button>
          )}{" "}
        </div>
      </div>
    );
  }
}

export default SpinnerButton;
