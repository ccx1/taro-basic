import * as actionTypes from '../constants/actionTypes'

export const userInfo = (state: {
  js_code: string;
  session_key: string;
  open_id: string;
  access_token: string;
} = {
  js_code: '',
  session_key: '',
  open_id: '',
  access_token: ''
}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        js_code: action.userInfo.js_code
      };
    case actionTypes.UPDATE_USER_SS_INFO:
      return {
        ...state,
        session_key: action.userInfo.session_key,
        open_id: action.userInfo.open_id
      };
    case actionTypes.UPDATE_USER_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.userInfo.access_token
      };
    default:
      return state;
  }
};
