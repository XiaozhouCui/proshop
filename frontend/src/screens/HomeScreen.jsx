import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
  // get keyword from url '/search/:keyword'
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  // with "useDispatch", we no longer need "connect" wrapper to dispatch actions
  const dispatch = useDispatch()

  // with "useSelector", we can pick a slice of store without "mapStateToProps"
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    // CANNOT add "async" directly to useEffect arg func
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber]) // add "dispatch" as dependency

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // only render products if there is NO error in store
        <>
          <Row>
            {products.map((product) => (
              // on small screen will take 12 columns
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
