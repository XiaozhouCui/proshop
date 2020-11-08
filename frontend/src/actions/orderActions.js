import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_CREATE_REQUEST })

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
    // POST request, pass in order object
    const { data } = await axios.post(`/api/orders`, order, config)
    // if successful, dispatch action to reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_DETAILS_REQUEST })

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
    // GET request, auth needed
    const { data } = await axios.get(`/api/orders/${id}`, config)
    // if successful, dispatch action to reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_PAY_REQUEST })

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
    // PUT request, pass in paymentResult from PayPal
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )
    // if successful, dispatch action to reducer
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}
