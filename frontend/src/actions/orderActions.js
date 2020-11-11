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
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
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

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_LIST_MY_REQUEST })

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
    // GET orders from API
    const { data } = await axios.get(`/api/orders/myorders`, config)
    // if successful, dispatch action to reducer
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_LIST_REQUEST })

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
    // GET orders from API
    const { data } = await axios.get('/api/orders', config)
    // if successful, store data to state.orderList.orders
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: ORDER_DELIVER_REQUEST })

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
    // PUT request, no need to pass any data
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )
    // if successful, update {success: true}
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}
