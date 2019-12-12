import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


function Sorting(props) {

    console.log(props)

    const handlwLowtoHigh = ()  => {
        let data = props.data.sort(function (a, b) {
            return a.price - b.price;
          });
        props.onClick(data)
    }

    const handleHightoLow = ()  => {
        let data = props.data.sort(function (a, b) {
            return b.price - a.price;
          });
        props.onClick(data)
    }

    const handleDiscount = ()  => {
        let data = props.data.sort(function (a, b) {
            return b.discount - a.discount;
          });
        props.onClick(data)
    }

    return (
      <div className='sorting'>
      <button onClick={handlwLowtoHigh} className='btn btn-link'>Price Low - High</button>
      <button onClick={handleHightoLow} className='btn btn-link' >Price High - Low</button>
      <button onClick={handleDiscount} className='btn btn-link'>Discount</button>
      </div>
    )
  }

  export default Sorting