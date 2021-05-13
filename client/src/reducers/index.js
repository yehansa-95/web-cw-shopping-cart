import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import { googleReducer } from "../reducers/googleReducers"

export default combineReducers({
  auth: authReducer,
  googleauth:googleReducer,
  errors: errorReducer
});