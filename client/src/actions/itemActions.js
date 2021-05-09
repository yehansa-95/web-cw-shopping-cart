import axios from "../actions/axios-config"; 
import {
  GET_ERRORS,  
} from "./types"; 

export const createItemRequest = (item, history) => dispatch => {
    axios
    .post("/api/admin/items/add", item)
    .then(res => history.push("/view-items"))  
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};