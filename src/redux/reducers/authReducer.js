import * as authTypes from 'redux/types/authTypes.js'; 

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.RESET_APP_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;

