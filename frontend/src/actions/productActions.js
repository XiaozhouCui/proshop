import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    // backend url "http://127.0.0.1:5000" is added as proxy in frontend package.json
    // proxy will fake "http://127.0.0.1:5000" as "http://127.0.0.1:3000"
    const { data } = await axios.get('/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        // check if both generic and custom message exist
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        // check if both generic and custom message exist
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header with bearer token from store
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // DELETE product from API
    await axios.delete(`/api/products/${id}`, config)
    // if successful, update state { success: true }
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header with bearer token from store
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // POST product from API, sending EMPTY object because backend will create SAMPLE data
    const { data } = await axios.post(`/api/products`, {}, config)
    // if successful, store data in state.productCreate.product
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header with bearer token from store
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // POST product from API, sending EMPTY object because backend will create SAMPLE data
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )
    // if successful, store data in state.productCreate.product
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header with bearer token from store
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // POST product from API, sending EMPTY object because backend will create SAMPLE data
    await axios.post(`/api/products/${productId}/reviews`, review, config)
    // if successful, store data in state.productCreate.product
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}
