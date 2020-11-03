import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

// "location" is used to get querry string parameters (?qty=3)
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  // console.log(location.search) // ?qty=3
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  // get cart items from store
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]) // useEffect will re-run if any of dependencies changes

  return (
    <div>
      <h2>Cart</h2>
    </div>
  )
}

export default CartScreen
