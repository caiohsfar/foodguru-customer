import { Alert, Platform } from 'react-native';
import reactotron from 'reactotron-react-native';
import { getIdToken } from '../../services/userService';
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  IS_LOADING_FETCHING_PRODUCTS,
  IS_LOADING_FETCHING_CATEGORIES,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CLEAR_PRODUCTS,
  CLEAR_CATEGORIES
} from '../types/MenuTypes';

import api from '../../services/api';

export const clearCart = {
  type: CLEAR_CART
};
export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  payload: product
});

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product
});

export const isLoadingFetchingProducts = () => ({
  type: IS_LOADING_FETCHING_PRODUCTS
});
export const isLoadingFetchingCategories = () => ({
  type: IS_LOADING_FETCHING_CATEGORIES
});

export const fetchProducts = sectionId => async (dispatch) => {
  dispatch(isLoadingFetchingProducts());
  api
    .get(`/products/${sectionId}`)
    .then((response) => {
      dispatch(fetchProductsSuccess(response.data));
    })
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export const fetchProductsSuccess = list => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: list
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error.response.message || error
});

export const fetchCategories = idEstab => async (dispatch) => {
  dispatch(isLoadingFetchingCategories());
  const accessToken = await getIdToken();
  api.defaults.headers.common['x-access-token'] = accessToken;
  api
    .get(`/sections/${idEstab}`)
    .then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});

export const clearCategories = () => ({
  type: CLEAR_CATEGORIES
});

export const fetchCategoriesSuccess = list => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: list
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error.response.message || error
});
