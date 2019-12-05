import React from 'react';
import PlaceHolder from './../assets/150.png';


function ImagePlaceholder(props) {
  let imageUrl = 'https://via.placeholder.com/150'
  const handler = (e) => {
    imageUrl = 'https://via.placeholder.com/150'
    console.log('ssss')
  }
  return (
    <img src={imageUrl} onError={handler}/>
  );
}

export default ImagePlaceholder;
