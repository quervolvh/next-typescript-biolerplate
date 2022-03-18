import * as authTypes from 'redux/types/authTypes';

const initialState = {};

const expiresAt = () => {

  const currentTime = new Date();

  const expiresAt = new Date(currentTime.getTime() + 850 * 1000);

  return expiresAt;

}

const authReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case authTypes.RESET_APP_START:
      return {
        ...state,
      };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...action.payload,
        expiresAt: expiresAt()
      };

    case authTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accesstoken: action.payload.accesstoken,
        expiresAt: expiresAt()
      };
      
    default:
      return state;
  }
};

export default authReducer;

