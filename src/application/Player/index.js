import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreator';

import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';

function Player (props) {

  const { fullScreen } = props;
  const { toggleFullScreenDispatch } = props;
  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{ name: "薛之谦" }]
  };

  return (
    <div>
      <MiniPlayer song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreenDispatch={toggleFullScreenDispatch}>

      </MiniPlayer>
      <NormalPlayer song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreenDispatch={toggleFullScreenDispatch}>

      </NormalPlayer>
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