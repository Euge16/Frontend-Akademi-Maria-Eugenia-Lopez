import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT} from "../actions/types";

const INITIAL_STATE = {
    products: []
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products, action.payload]
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload.id)
        };
      case FETCH_PRODUCTS:
        return {
          ...state,
          products: action.payload
        }; 
      
      case UPDATE_PRODUCT:
        return {
          ...state,
          products: state.products.map(product => 
            product.id === action.payload.id ? action.payload : product
          )
        };
      default:
        return state;
    }
  };
  
  export default productReducer;