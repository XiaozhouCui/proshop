import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // with "useDispatch", we no longer need "connect" wrapper to dispatch actions
  const dispatch = useDispatch()

  // with "useSelector", we can pick a slice of store without "mapStateToProps"
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    // CANNOT add "async" directly to useEffect arg func
    dispatch(listProducts())
  }, [dispatch]) // add "dispatch" as dependency

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        // only render products if there is NO error in store
        <Row>
          {products.map((product) => (
            // on small screen will take 12 columns
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
