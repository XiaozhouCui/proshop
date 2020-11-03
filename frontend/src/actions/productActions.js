import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
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
