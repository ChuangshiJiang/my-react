import React, { memo, useState, useEffect,useContext } from 'react';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll';
import Horizen from '../../baseUI/horizen-item';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { alphaTypes, type as types, area as areas } from '../../api/config';

import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading
} from './store/actionCreator';

function Singers (props) {
  let [alpha, setAlpha] = useState('');
  let [area, setArea] = useState('-1');
  let [type, setType] = useState('-1');
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

  useEffect(() => {
    getHotSingerDispatch();
  }, []);

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(type, area, val);
  };

  let handleUpdateType = (val) => {
    setType(val);
    updateDispatch(val, area, alpha);
  };

  let handleUpdateArea = (val) => {
    setArea(val);
    updateDispatch(type, val, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(type, area, alpha, pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(type, area, alpha);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    // console.table(list);
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId || item.id}>
                <div className='img_wrapper'>
                  <LazyLoad placeholder={<img src={require('./singer.png')} />} alt='music'>
                    <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
                  </LazyLoad>
                </div>
                <span className='name'>{item.name}</span>
              </ListItem>
            );
          })
        }
      </List>
    );
  }

  return (
    <div>
      <NavContainer>
        <Horizen list={types} title={"分类:"} handleClick={val => handleUpdateType(val)} oldVal={type}></Horizen>
        <Horizen list={areas} title={"地区:"} handleClick={val => handleUpdateArea(val)} oldVal={area}></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll pullUp={handlePullUp} pullDown={handlePullDown} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading} onScroll={forceCheck}>
          {
            renderSingerList()
          }
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHotSingerDispatch () {
      dispatch(getHotSingerList());
    },
    updateDispatch (type, area, alpha) {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(type, area, alpha));
    },
    //滑到最底部刷新处理
    pullUpRefreshDispatch (type, area, alpha, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      dispatch(refreshMoreSingerList(type, area, alpha));
    },
    //顶部下拉刷新
    pullDownRefreshDispatch (type, area, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if (type === '' && area === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(type, area, alpha));
      }
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));
