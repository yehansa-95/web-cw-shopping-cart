import { GOOGLE_OAUTH2 } from "../actions/types";
var empty = require('is-empty');
const initialState = [];

export const googleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_OAUTH2: {
        return {
            ...state,
            isAuthenticated: !empty(action.googleResponse),
            user: action.googleResponse.profileObj
          };
    }
    default:
      return state;
  }
};