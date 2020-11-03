import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

// "getState()" will return the entire state tree of redux store
export const adToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  // save cart items to localstorage after state update
  // JSON.stringify because local storage can only take in strings
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
