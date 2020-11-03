import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: 100,
        height: 100,
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading</span>
    </Spinner>
  )
}

export default Loader
