import * as workerTypes from 'redux/types/workerTypes';
import * as authTypes from 'redux/types/authTypes';

const initialState = {
  activity: [],
  refreshing: false
};

const workerReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case workerTypes.ADD_ACTIVITY:
      return {
        ...state,
        activity: state.activity.length > 9 ?
          [...state.activity.slice(1, 10), action.payload]
          : [...state.activity, action.payload]
      }
    case workerTypes.CLEAR_ACTIVITY:
      return {
        ...state,
        activity: []
      }
    case authTypes.REFRESH_TOKEN_START:
      return {
        ...state,
        refreshing: true
      }
    case authTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshing: false
      }
    case authTypes.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        refreshing: false
      }

    default:
      return state;
  }
};

export default workerReducer;
