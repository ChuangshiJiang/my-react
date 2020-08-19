import * as actionTypes from './constants';
import { getAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

export const chagneCurrentAlbum = data => ({
  type: actionTypes.CHAGNE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: data
});

export const getAlbumList = (id) => {
  return dispatch => {
    getAlbumDetailRequest(id).then(res=>{
      let data = res.playlist;
      dispatch(changeEnterLoading(false));
      dispatch(chagneCurrentAlbum(data));
    }).catch(()=>{
      console.log('获取album数据失败');
    });
  }
}