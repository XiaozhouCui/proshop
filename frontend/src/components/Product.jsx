import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            // color='#f8e825' // this is defined in Rating.defaultProps
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

// type check errors will appear in console
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Product
