import reactotron from 'reactotron-react-native';
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  IS_LOADING_FETCHING_PRODUCTS,
  IS_LOADING_FETCHING_CATEGORIES,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from '../types/MenuTypes';

const INITIAL_STATE = {
  fetchProductsError: false,
  fetchCategoriesError: false,
  fetchProductsLoadState: false,
  fetchCategoriesLoadState: false,
  productList: [],
  categoryList: [],
  shoppingCart: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FETCHING_PRODUCTS:
      return {
        ...state,
        fetchProductsLoadState: true
      };
    case IS_LOADING_FETCHING_CATEGORIES:
      return {
        ...state,
        fetchCategoriesLoadState: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        fetchProductsLoadState: false,
        fetchProductsError: false
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchProductsError: true,
        fetchProductsLoadState: false
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        fetchCategoriesLoadState: false,
        fetchCategoriesError: false
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchCategoriesError: true,
        fetchCategoriesLoadState: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => product.id !== action.payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        shoppingCart: []
      };
    default:
      return state;
  }
};
