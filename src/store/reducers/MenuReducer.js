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
  CLEAR_CART,
  CLEAR_CATEGORIES,
  CLEAR_PRODUCTS
} from '../types/MenuTypes';

const INITIAL_STATE = {
  fetchProductsError: false,
  fetchCategoriesError: false,
  fetchProductsLoadState: false,
  fetchCategoriesLoadState: false,
  productList: [],
  categoryList: [],
  shoppingCart: [],
  totalFromCart: 0,
  cartItemsQuantity: 0
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
        shoppingCart: addToCart(action, state),
        totalFromCart: state.totalFromCart + action.payload.price,
        cartItemsQuantity: state.cartItemsQuantity + action.payload.quantity
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        shoppingCart: removeFromCart(action, state),
        totalFromCart: state.totalFromCart - action.payload.price,
        cartItemsQuantity: state.cartItemsQuantity - 1
      };
    case CLEAR_CART:
      return {
        ...state,
        shoppingCart: [],
        totalFromCart: 0
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categoryList: []
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        productList: []
      };
    default:
      return state;
  }
};

const removeFromCart = ({ payload }, { shoppingCart }) => {
  for (let index = 0; index < shoppingCart.length; index++) {
    const product = shoppingCart[index];
    if (product.id === payload.id && product.quantity === 1) {
      return shoppingCart.filter(productf => productf.id !== payload.id );
    }
  }
  return shoppingCart.map(product => (product.id === payload.id
    ? {
      ...product,
      quantity: product.quantity - 1,
      price: product.price - product.price / product.quantity
    }
    : product));
};

const addToCart = ({ payload }, { shoppingCart }) => {
  let exists = false;
  shoppingCart.forEach((product) => {
    if (product.id === payload.id) {
      exists = true;
    }
  });
  if (!exists) {
    return [...shoppingCart, payload];
  }
  return shoppingCart.map(product => (product.id === payload.id
    ? {
      ...product,
      quantity: product.quantity + payload.quantity,
      price: product.price + payload.price
    }
    : product));
};
