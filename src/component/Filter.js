import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign} from '@fortawesome/free-solid-svg-icons'

import 'rc-slider/assets/index.css';


function Filter(props) {

    const [rangeValue, setRangeValue] = useState([])

    useEffect(() => {
        setRangeValue([props.min, props.max])
    }, [props.min, props.max])


    console.log(rangeValue)

    const [selectedRange, setSelectedRange] = useState()

    const handleChange = (value) => {
        console.log(value)
        setSelectedRange(value)
    }


    const hadnleValue = () => {
        let [min, max] = selectedRange
        props.filterSubmit({'min': min, 'max': max})
    }

    return (
      <div className='filter mt-3'>
      <h5>Filter</h5>
      <div className='d-flex'>
      <div><FontAwesomeIcon icon={faRupeeSign} />{props.min}</div>
      <div className='ml-auto'><FontAwesomeIcon icon={faRupeeSign} />{props.max}</div>
      </div>
      <Range allowCross={false} defaultValue={rangeValue} tabIndex={0, 0} value={selectedRange} step={10} min={props.min} max={props.max} onChange={handleChange}/>
      <div className='d-flex justify-content-center'>Price</div>
      <div className='d-flex justify-content-center'><button onClick={hadnleValue} className='btn btn-primary rounded-pill'>Apply</button></div>
      </div>
    )
  }

  export default Filter