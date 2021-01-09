import {combineReducers} from 'redux'
import counter from './counter'
import {pageInfo} from './pageInfo'
import {userInfo} from './userInfo'

export default combineReducers({
  counter,
  pageInfo,
  userInfo
})
