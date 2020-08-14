import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index'

export default combineReducers({
  //根据具体功能模块添加reducer
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  
});