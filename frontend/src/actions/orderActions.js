import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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