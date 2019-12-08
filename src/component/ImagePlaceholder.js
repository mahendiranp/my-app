import React, { Component } from "react";
import PlaceHolder from './../assets/150.png';

class ImagePlaceholder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: this.props.url,
      errored: false,
    };
    this.onError = this.onError.bind(this)
  }
  onError() {
    if (!this.state.errored) {
      this.setState({
        src: PlaceHolder,
        errored: true,
      });
    }
  }
  render(){
    const { src } = this.state;
    return (
      <img
        src={src}
        onError={this.onError}
      />
    )
  }

}



export default ImagePlaceholder;
