import React from 'react'
import {connect} from 'react-redux'
import {View, Button, Text} from '@tarojs/components'
import './index.less'
import {add, minus} from "../../actions/counter";
import {AtButton} from "taro-ui";
import {navigateTo} from '@tarojs/taro'

class Index extends React.Component<any, any> {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={() => {
          this.props.dispatch(add())
        }}>+</Button>
        <Button className='dec_btn' onClick={() => {
          this.props.dispatch(minus())
        }}>-</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <AtButton onClick={()=>{
          navigateTo({url:"pa"})
        }}>去登陆</AtButton>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {...state};
};
export default connect(mapStateToProps)(Index);

// export default Index;

