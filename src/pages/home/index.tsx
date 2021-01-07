import React from "react";
import {navigateTo} from '@tarojs/taro'
import {View} from "@tarojs/components";
import './index.less'
import {AtButton} from "taro-ui";


class Home extends React.Component<any, any>{

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        天气真的好冷aaaaa
        <AtButton type="primary" onClick={()=>{
          navigateTo({
            url: '/pages/index/index'
          })
        }}>我点a</AtButton>
      </View>
    );
  }
}

export default Home;
