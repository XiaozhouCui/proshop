import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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
