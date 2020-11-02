import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // CANNOT add "async" directly to useEffect arg func
    const fetchProducts = async () => {
      // backend url "http://127.0.0.1:5000" is added as proxy in frontend package.json
      // proxy will fake "http://127.0.0.1:5000" as "http://127.0.0.1:3000"
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          // on small screen will take 12 columns
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
