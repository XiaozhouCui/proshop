import React from 'react'
import { Col, Row } from 'react-bootstrap'
import products from '../products'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          // on small screen will take 12 columns
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
