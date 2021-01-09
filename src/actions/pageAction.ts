import * as types from '../constants/actionTypes'

export const updatePageInfoCode = (pageInfo = {js_code: ''}) => {
  return {
    type: types.UPDATE_PAGE_INFO,
    pageInfo
  };
};

export const updatePageInfoSS = (pageInfo = {session_key: '', open_id: ''}) => {
  return {
    type: types.UPDATE_PAGE_SS_INFO,
    pageInfo
  };
};

export const updatePageInfoAccessToken = (pageInfo = {access_token: ''}) => {
  return {
    type: types.UPDATE_PAGE_ACCESS_TOKEN,
    pageInfo
  };
};
