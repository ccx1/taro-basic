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
          secret: "7c348b8e5f887d2e328431dfd08202bc",
          appid: "wx4885b83cf21c9d8d",
          grant_type: "authorization_code",
          js_code: res.code
        }).then((res: any) => {
          console.log(res);
          props.dispatch(Action.updateUserInfoSS({open_id: res.openid, session_key: res.session_key}))
          // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=你的appid&secret=你的小程序秘钥
        })

        api.getAccessToken({
          grant_type: "client_credential",
          secret: "7c348b8e5f887d2e328431dfd08202bc",
          appid: "wx4885b83cf21c9d8d"
        }).then((res: any) => {
          console.log(res)
          props.dispatch(Action.updateUserInfoAccessToken({access_token: res.access_token}))
        })

      }
    })

  }

  sendMsg = () => {
    const {
      access_token,
      open_id
    } = this.props;
    const data2 = {
      touser:open_id,
      template_id: "ZqcKc9C_yUMMTqgBeP6Ai0tn7m65C4ydtbbq8jOZfJc",
      page: "/pages/login/index",
      miniprogram_state:"developer",
      lang:"zh_CN",
      data: {
        thing1: {
          value: "酒店",
          color: "#4a4a4a"
        },
        thing3: {
          value: "2018-03-22",
          color: "#9b9b9b"
        }
      }
    }
    api.templateSend(access_token, data2)
      .then((res) => {
        console.log(res);
      })
    // console.log(this.props);
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
