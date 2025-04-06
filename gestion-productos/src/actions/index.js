import api from '../api/products';
import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT } from "./types";

export const addProduct = (product) => async dispatch => {
  const response = await api.post('/products', product);
  dispatch({
    type: ADD_PRODUCT,
    payload: response.data
  });
};

export const deleteProduct = (id) => async dispatch => {
  await api.delete(`/product/${id}`);
  dispatch({
    type: DELETE_PRODUCT,
    payload:{id}
  });
};

export const fetchProducts = () => async dispatch => {
  const response = await api.get('/products');
  dispatch({
    type: FETCH_PRODUCTS,
    payload: response.data
  });
  
};

export const updateProduct = (id, product) => async dispatch => {
  const response = await api.put(`/products/${id}`, product);
  dispatch({
    type: UPDATE_PRODUCT,
    payload: response.data
  });

}