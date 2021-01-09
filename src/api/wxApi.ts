import common from "../utils/common";
import * as config from "../constants/conf";

export const getWxCode = () => {
  return new Promise<string>((resolve, reject) => {
    wx.login({
      success(res: wx.LoginResponse) {
        resolve(res.code)
      },
      fail(res: any) {
        reject(res)
      }
    })
  })
}

export const getDefaultUserInfo = () => {
  return new Promise((resolve) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res: wx.UserInfoResponse) {
              const {avatarUrl, nickName} = res.userInfo;
              resolve({avatarUrl, nickName})
            }
          })
        } else {
          resolve({avatarUrl: '', nickName: ''})
        }
      }
    })
  })
}

export const getSessionKey = params => (
  common.requestInPromise({
    url: config.GLOBAL_CONFIG.requestUrl.getSessionKey,
    type: 'GET',
    data: params
  })
)

export const getAccessToken = params => (
  common.requestInPromise({
    url: config.GLOBAL_CONFIG.requestUrl.getAccessToken,
    type: 'GET',
    data: params
  })
)
