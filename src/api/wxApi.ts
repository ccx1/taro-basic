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
