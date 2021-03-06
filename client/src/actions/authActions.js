import axios from "../actions/axios-config";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SAVE_LOCAL_USER,
  USER_LOADING
} from "./types"; 

export const registerUserRequest = (userData, history) => dispatch => {

  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/signIn"))  
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUserRequest = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => { 
      const { token } = res.data;
      localStorage.setItem("jwtToken", token); 
      setAuthToken(token); 
      const decoded = jwt_decode(token); 
      dispatch(saveLocalUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerAdminRequest = (userData, history) => dispatch => {
  axios
    .post("/api/admin/register", userData)
    .then(res => history.push("/signIn-admin"))  
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginAdminRequest = user => dispatch => {
  axios
    .post("/api/admin/login", user)
    .then(res => { 
      const { token } = res.data;
      localStorage.setItem("jwtToken", token); 
      setAuthToken(token); 
      const decoded = jwt_decode(token); 
      dispatch(saveLocalUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const saveLocalUser = decoded => {
  return {
    type: SAVE_LOCAL_USER,
    payload: decoded
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => { 
  localStorage.removeItem("jwtToken"); 
  setAuthToken(false); 
  dispatch(saveLocalUser({}));
};