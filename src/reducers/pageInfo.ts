import * as actionTypes from '../constants/actionTypes'

export const pageInfo = (state: {
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
    case actionTypes.UPDATE_PAGE_INFO:
      return {
        ...state,
        js_code: action.pageInfo.js_code
      };
    case actionTypes.UPDATE_PAGE_SS_INFO:
      return {
        ...state,
        session_key: action.pageInfo.session_key,
        open_id: action.pageInfo.open_id
      };
    case actionTypes.UPDATE_PAGE_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.pageInfo.access_token
      };
    default:
      return state;
  }
};
