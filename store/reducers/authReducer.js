import {
  SIGNIN_SUCCESS,
  AUTH_ERROR,
  SIGNOUT_SUCCESS,
  ADD_USER_DETAILS
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: undefined,
  error: undefined
};

//   console.log('newCart==========',newCart)

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      console.log(action.type);
      return {
        user: action.payload,
        isAuthenticated: true
      };
    case SIGNOUT_SUCCESS:
      return {
        user: undefined,
        isAuthenticated: false,
        error: undefined
      };
    case ADD_USER_DETAILS:
      return {
        user: action.payload,
        isAuthenticated: false,
        error: undefined
      };
    case AUTH_ERROR:
      return {
        error: action.payload
      };

    default:
      return state;
  }
}
