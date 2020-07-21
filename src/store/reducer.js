import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index'


export default combineReducers({
  //根据具体功能模块添加reducer
  recommend: recommendReducer
});