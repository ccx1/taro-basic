import React from "react";
import {connect} from 'react-redux'
import {AtButton, AtMessage} from "taro-ui";
import {View} from "@tarojs/components";

class Login extends React.Component<any, any> {

  constructor(props) {
    super(props);
    wx.login({
      success(res: wx.LoginResponse) {
        console.log(res.code)
      }
    })
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
      </View>
    );
  }

}


const mapStateToProps = state => {
  return {...state};
};
export default connect(mapStateToProps)(Login);
