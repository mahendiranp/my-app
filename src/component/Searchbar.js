import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

function Searchbar(props) {
    return (
      <div>
      <button className='btn btn-link text-white'><FontAwesomeIcon icon={faSearch} /></button>
      </div>
    )
  }

  export default Searchbar