/**
 * @file saga
 */
import {fork, put, call, all} from 'redux-saga/effects';
import * as wxApi from '../api/wxApi';
import * as Action from "../actions";

function* getPageData() {
    try {
      // 获取jscode， 阻塞线程， 去获取数据
      const js_code = yield call(wxApi.getWxCode);
      yield put(Action.updateUserInfoCode({js_code}))

      const [sessionData, accessData] = yield all([
          call(wxApi.getSessionKey,{
            secret: "7c348b8e5f887d2e328431dfd08202bc",
            appid: "wx4885b83cf21c9d8d",
            grant_type: "authorization_code",
            js_code
          }),
          call(wxApi.getAccessToken,{
            grant_type: "client_credential",
            secret: "7c348b8e5f887d2e328431dfd08202bc",
            appid: "wx4885b83cf21c9d8d"
          })
      ]);
      yield put(Action.updateUserInfoSS({open_id: sessionData.openid, session_key: sessionData.session_key}))
      yield put(Action.updateUserInfoAccessToken({access_token: accessData.access_token}))
      // console.log(sessionData);
      // console.log(accessData);

    } catch (e) {
        // yield put(console.log(e));
    }
}

function* initPage() {
    yield fork(getPageData);

}


export default function* root() {
    yield all([
        fork(initPage),
    ]);
}
