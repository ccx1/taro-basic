import * as types from '../constants/actionTypes'

export const updateUserInfoCode = (userInfo = {js_code: ''}) => {
  return {
    type: types.UPDATE_USER_INFO,
    userInfo
  };
};

export const updateUserInfoSS = (userInfo = {session_key: '', open_id: ''}) => {
  return {
    type: types.UPDATE_USER_SS_INFO,
    userInfo
  };
};

export const updateUserInfoAccessToken = (userInfo = {access_token: ''}) => {
  return {
    type: types.UPDATE_USER_ACCESS_TOKEN,
    userInfo
  };
};
