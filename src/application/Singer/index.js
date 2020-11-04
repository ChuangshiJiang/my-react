import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { Container, ImgWrapper, BgLayer, CollectButton, SongListWrapper } from './style';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import SongsList from '../SongsList';
import { HEADER_HEIGHT } from './../../api/config';
import { getSingerInfo,changeEnterLoading } from './store/actionCreators';

const mapStateToProps = state => {
  return {
    artist: state.getIn(['singerInfo','artist']),
    songs: state.getIn(['singerInfo','songsOfArtist']),
    loading: state.getIn(['singerInfo','loading'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch(id){
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    }
  };
};

function Singer (props) {
  const [showStatus, setShowStatus] = useState(true);

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  //图片初始高度
  const initHeight = useRef(0);

  //往上偏移的尺寸
  const OFFSET = 5;

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initHeight.current = h;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(pos => {
    let height = initHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    const percent = Math.abs(newY / height);
    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`;
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`;
      buttonDOM.style['opacity'] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const { 
    artist: immutableArtist,
    songs: immutableSongs,
    loading
  } = props;

  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      className="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={"头部"} ref={header}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList songs={songs} showCollect={false}></SongsList>
          </Scroll>
        </SongListWrapper>
        {
        loading
        ?<Loading />
        :null
      }
      </Container>
    </CSSTransition>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singer));