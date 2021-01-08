import React from "react";
import {connect} from 'react-redux'
import {AtButton, AtMessage} from "taro-ui";
import {View} from "@tarojs/components";
import * as api from '../../api'
import * as Action from "../../actions";


class Login extends React.Component<any, any> {

  constructor(props) {
    super(props);
    wx.login({
      success(res: wx.LoginResponse) {
        console.log(res.code)
        props.dispatch(Action.updateUserInfoCode({js_code: res.code}))
        api.getSessionKey({
          secret: "0434b5e52554f27bb86e4555de8c0592",
          appid: "wx492725414fd479af",
          grant_type: "authorization_code",
          js_code: res.code
        }).then((res: any) => {
          console.log(res);
          props.dispatch(Action.updateUserInfoSS({open_id: res.openid, session_key: res.session_key}))
          // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=你的appid&secret=你的小程序秘钥
        })

        api.getAccessToken({
          grant_type: "client_credential",
          secret: "0434b5e52554f27bb86e4555de8c0592",
          appid: "wx492725414fd479af"
        }).then((res: any) => {
          console.log(res)
          props.dispatch(Action.updateUserInfoAccessToken({access_token: res.access_token}))
        })

      }
    })

  }

  sendMsg = () => {
    const {props} = this.props;
    // const data = {
    //   touser: props.openid, //用户的openid
    //   template_id: '模板消息ID',
    //   page: '/pages/login/index',
    //   form_id: "ZqcKc9C_yUMMTqgBeP6Ai0tn7m65C4ydtbbq8jOZfJc",
    //   data: {           //模板消息要对应 有几个写几个  避免为空模板
    //     "keyword1": {
    //       "value": "酒店",
    //       "color": "#4a4a4a"
    //     },
    //     "keyword2": {
    //       "value": "2018-03-22",
    //       "color": "#9b9b9b",
    //     },
    //     "keyword3": {
    //       "value": "$300",
    //       "color": "#9b9b9b"
    //     },
    //     "keyword4": {
    //       "value": "中国",
    //       "color": "#9b9b9b"
    //     },
    //   },
    //   color: '#ccc',
    //   emphasis_keyword: 'keyword1.DATA'
    // }
    console.log(this.props);
  }

  render() {
    return (
      <View>
        <AtMessage/>
        <AtButton type={"primary"} onClick={() => {
          // wx.getUserInfo({
          //   success(res: wx.UserInfoResponse) {
          //     console.log(res)
          //   }
          // })
          wx.getSetting({
            success(res) {
              console.log(res);
              if (!res.authSetting['scope.camera']) {
                wx.authorize({
                  scope: 'scope.camera',
                  success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    // wx.startRecord()
                    wx.getUserInfo({
                      success(res: wx.UserInfoResponse) {
                        console.log(res)
                      }
                    })
                  },
                  fail() {
                    console.log("授权失败")
                  }
                })
              }
            }
          })
        }}>授权照相机</AtButton>

        {/*wx.authorize({scope: "scope.userInfo"})，不会弹出授权窗口，请使用 <button open-type="getUserInfo"/>*/}
        {/*需要授权 scope.userLocation、scope.userLocationBackground*/}
        {/*后续可以判断。 先判断有没有权限， 如果曾经授权过，但是没有同意授权，去打开谁，否则去调用这个按钮。*/}
        <AtButton openType={"getUserInfo"} onGetUserInfo={(e) => {
          console.log(e.detail)
        }}>授权微信获取信息</AtButton>
        <AtButton openType={"getPhoneNumber"} onGetPhoneNumber={(e) => {
          console.log(e.detail)
        }}>获取用户手机号码</AtButton>

        <AtButton customStyle={{marginTop: "10px"}} openType={"openSetting"}>打开设置</AtButton>
        <AtButton customStyle={{marginTop: "10px"}} openType={"subscribe"}>打开订阅</AtButton>
        <AtButton onClick={this.sendMsg}>发送订阅消息</AtButton>
      </View>
    );
  }

}


const mapStateToProps = state => {
  const userInfo = state.userInfo;
  return {...userInfo};
};
export default connect(mapStateToProps)(Login);
