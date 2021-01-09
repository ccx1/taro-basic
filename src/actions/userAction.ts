import * as types from '../constants/actionTypes'
import {IUserInfo} from "../reducers/userInfo";

export const updateUserInfo = (userInfo: IUserInfo) => {
  return {
    type: types.UPDATE_USER_INFO,
    userInfo
  };
};
