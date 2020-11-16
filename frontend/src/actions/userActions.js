import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

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
    // if successful, save data to state.userLogin.userInfo
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
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
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
    // if successful, save data to state.userRegister.userInfo
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

// if we only get profile, pass in string "profile" as "id" arg
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_DETAILS_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header from token in state
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // "id" can be ":id" or string "profile"
    const { data } = await axios.get(`/api/users/${id}`, config)
    // if successful, dispatch action to reducer
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

// take in entire user object
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header from token in state
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // PUT request, pass in user object
    const { data } = await axios.put(`/api/users/profile`, user, config)
    // if successful, save profile to state.userDetauls.user
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_LIST_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header from token in state
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // PUT request, pass in user object
    const { data } = await axios.get(`/api/users`, config)
    // if successful, save data to state.userList.users
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_DELETE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header from token in state
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // DELETE request, pass in user ID
    await axios.delete(`/api/users/${id}`, config)
    // if successful, set state { success: true }
    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    // dispatch action to reducer to set loading=true
    dispatch({ type: USER_UPDATE_REQUEST })

    // get state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // setup auth header from token in state
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // UPDATE request, pass in user object
    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    // if successful, set store { success: true }
    dispatch({
      type: USER_UPDATE_SUCCESS,
    })
    // save user details to state.userDetails.user
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message from api
          : error.response, // generic message
    })
  }
}
