import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import { googleReducer } from "../reducers/googleReducers"
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  googleauth:googleReducer,
  errors: errorReducer,
  cart: cartReducer,
  order: orderReducer
});