import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreator';

import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';

import { getSongUrl, isEmptyObj } from '../../api/utils';

function Player (props) {
  const { fullScreen,playing,currentIndex,currentSong:immutableCurrentSong } = props;
  const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props;
  const audioRef = useRef();
  let currentSong = immutableCurrentSong.toJS();
  //目前播放时间
  const [currentTime,setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration,setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration)?0:currentTime/duration;
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    }
  ];

  useEffect(() => {
    if (!currentSong) return;
    changeCurrentIndexDispatch(0);
    let current = playList[0];
    changeCurrentDispatch(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(()=>{
      audioRef.current.play();
    });
    togglePlayingDispatch(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000)|0);
    //eslint-disable-next-line
  }, []);

  useEffect(()=>{
    playing? audioRef.current.play():audioRef.current.pause();
  },[playing]);

  const onProgressChange = curPercent=>{
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if(!playing){
      togglePlayingDispatch(true);
    }
  };

  const updateTime = (e) =>{
    setCurrentTime(e.target.currentTime);
  };

  return (
    <div>
      {
        isEmptyObj(currentSong) ? null :
          <MiniPlayer song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            duration={duration}
            currentTime={currentTime}
            percent={percent}
            clickPlaying={clickPlaying}
            toggleFullScreenDispatch={toggleFullScreenDispatch}>
          </MiniPlayer>
      }
      {
        isEmptyObj(currentSong) ? null :
          <NormalPlayer song={currentSong}
            fullScreen={fullScreen}
            percent={percent}
            playing={playing}
            duration={duration}
            currentTime={currentTime}
            clickPlaying={clickPlaying}
            onProgressChange={onProgressChange}
            toggleFullScreenDispatch={toggleFullScreenDispatch}>
          </NormalPlayer>
      }
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </div>
  );
}

//映射Redux全局的state到 props 上
const mapStateToProps = state => {
  return {
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
  };
};

//映射dispatch 到props上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch (data) {
      dispatch(actionCreators.changePlayingState(data));
    },
    toggleFullScreenDispatch (data) {
      dispatch(actionCreators.changeFullScreen(data));
    },
    togglePlayListDispatch (data) {
      dispatch(actionCreators.changeShowPlayList(data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch(actionCreators.changeCurrentIndex(index));
    },
    changeCurrentDispatch (data) {
      dispatch(actionCreators.changeCurrentSong(data));
    },
    changeModeDispatch (data) {
      dispatch(actionCreators.changePlayMode(data));
    },
    changePlayListDispatch (data) {
      dispatch(actionCreators.changePlayList(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));