import React from "react";
import {connect} from 'react-redux'
import {AtButton, AtMessage} from "taro-ui";
import {Image, Text, View} from "@tarojs/components";
import * as api from '../../api'
import UserIcon from './img/user.png'
import './index.less'
import {IUserInfo} from "../../reducers/userInfo";
import * as UserAction from '../../actions/userAction';

// import * as Action from "../../actions";


class Login extends React.Component<any, any> {

    constructor(props) {
        super(props);

    }

    subscribeMsg = () => {
        wx.requestSubscribeMessage({
            tmplIds: ["GVhh1D4euguLOA0IsNbaQ-wecxrmagbJYKPbf6Vx_Q4"],
            success(res) {
            }
        })
    }

    sendMsg = () => {
        const {
            access_token,
            open_id
        } = this.props;
        const data = {
            touser: open_id,
            template_id: "GVhh1D4euguLOA0IsNbaQ-wecxrmagbJYKPbf6Vx_Q4",
            page: "/pages/login/index",
            data: {
                thing1: {
                    value: "酒店"
                },
                thing4: {
                    value: "起床"
                }
            }
        }
        api.templateSend(access_token, data)
            .then((res) => {
                console.log(res);
            })
    }

    render() {
        const userInfo: IUserInfo = this.props.userInfo;
        const {dispatch} = this.props;
        return (
            <View className={"login-wrapper"}>
                <AtMessage/>
                <View className={"user-info-wrapper"}>
                    <View>
                        <Image className={"user-icon"} src={userInfo.avatarUrl ? userInfo.avatarUrl : UserIcon}/>
                    </View>
                    {
                        userInfo.nickName ? <Text>
                            欢迎用户 ： {userInfo.nickName}
                        </Text> : null
                    }
                </View>

                <Text>
                    授权相关
                </Text>
                <AtButton onClick={() => {
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
                    const {avatarUrl, nickName} = e.detail.userInfo;
                    dispatch(UserAction.updateUserInfo({avatarUrl, nickName}))
                }}>授权微信获取信息</AtButton>
                <AtButton openType={"getPhoneNumber"} onGetPhoneNumber={(e) => {
                    console.log(e.detail)
                }}>获取用户手机号码(测试账号使用)</AtButton>
                <Text>
                    设置
                </Text>
                <AtButton customStyle={{marginTop: "10px"}} openType={"openSetting"}>打开设置</AtButton>
                <Text>
                    订阅相关
                </Text>
                <AtButton openType={"subscribe"}>打开订阅</AtButton>
                <AtButton onClick={this.subscribeMsg}>订阅消息</AtButton>
                <AtButton onClick={this.sendMsg}>发送订阅消息</AtButton>
            </View>
        );
    }

}


const mapStateToProps = state => {
    const {pageInfo, userInfo} = state;
    return {...pageInfo, userInfo};
};
export default connect(mapStateToProps)(Login);
