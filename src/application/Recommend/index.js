import React, { memo, useEffect, useRef } from 'react';
import Slider from '../../components/slider/';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll';
import { Content } from './style';

import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreator';

import { forceCheck } from 'react-lazyload';

function Recommend (props) {
  const { getBannerDataDispatch, getRecommendDataDispatch } = props;
  const { bannerList, recommendList } = props;
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendDataDispatch();
  }, [getBannerDataDispatch, getRecommendDataDispatch]);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  // const scroll = useRef(null);

  return (
    <Content>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>

  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => (
  {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList'])
  }
)

//映射dispatch到props上
const mapDispatchToProps = dispatch => (
  {
    getBannerDataDispatch () {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendDataDispatch () {
      dispatch(actionTypes.getRecommendList());
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
