import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_LOGIN_REQUEST })
    // setup headers for post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // send post request with credentials and config
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    // if successful, dispatch action to reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const logout = () => (dispatch) => {
  // clear localStorage
  localStorage.removeItem('userInfo')
  // USER_LOGOUT will set state.userLogin to {}
  dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_REGISTER_REQUEST })
    // setup headers for post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // send post request with credentials and config
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    // if successful, dispatch action to reducer
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    // log user in immediately after register
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}
