import {
    SIGNIN_SUCCESS,
    AUTH_ERROR,
    SIGNOUT_SUCCESS,
    ADD_USER_DETAILS
  } from "../actions/types";
  const initialState = {
    isAuthenticated: false,
    tutors: undefined,
    error: undefined
  };
  
  //   console.log('newCart==========',newCart)
  
  export default function jobReducer(state = initialState, action) {
    switch (action.type) {
      case 'AVAILABLE_TUTOR':
        console.log(action.type);
        return {
          tutors: action.payload,
          isAuthenticated: true
        };
    
      default:
        return state;
    }
  }
  