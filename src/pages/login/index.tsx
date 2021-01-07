import React from "react";
// import {navigateTo} from "@tarojs/taro";
import {connect} from 'react-redux'
import {AtButton} from "taro-ui";
import {View} from "@tarojs/components";

class Login extends React.Component<any, any>{

  render() {
    return (
      <View>
        <AtButton type={"primary"}>微信登录</AtButton>
      </View>
    );
  }

}


const mapStateToProps = state => {
  return {...state};
};
export default connect(mapStateToProps)(Login);
