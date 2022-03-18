import * as userTypes from 'redux/types/userTypes';

const initialState = {};

const userReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case userTypes.SAVE_USER_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    case userTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default userReducer;

