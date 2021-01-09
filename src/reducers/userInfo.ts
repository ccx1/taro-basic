import * as actionTypes from '../constants/actionTypes'

export interface IUserInfo {
  avatarUrl: string; // 头像
  country?: string;// 国家
  province?: string;// 省
  city?: string;// 城市
  gender?: number; //男1 女0
  language?: string; // 语言
  nickName: string; // 昵称
}

export const userInfo = (state: IUserInfo = {
  avatarUrl: '',
  country: undefined,
  province: undefined,
  city: undefined,
  gender: -1,
  language: undefined,
  nickName: ''
}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.userInfo
      };
    default:
      return state;
  }
};
