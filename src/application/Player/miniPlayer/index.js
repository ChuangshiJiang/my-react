import React, { useRef } from 'react';
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';

import ProgressCircle from '../../../baseUI/progress-circle';

function MiniPlayer (props) {
  const { song, fullScreen, playing, percent } = props;
  const { toggleFullScreenDispatch,clickPlaying } = props;
  const miniPlayerRef = useRef();
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex';
      }}
      onExit={() => {
        miniPlayerRef.current.style.display = 'none';
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => {
          toggleFullScreenDispatch(true);
        }}>
        <div className="icon">
          <div className="imgWrapper">
            <img src={song.al.picUrl} alt="img" height="40" width="40" className={`play ${playing ? "" : "pause"}`} />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {
              playing
              ?<i className="iconfont icon-mini icon-pause" onClick={e=>clickPlaying(e,false)}>&#xe650;</i>
              :<i className="iconfont icon-mini icon-play" onClick={e=>clickPlaying(e,true)}>&#xe61e;</i>
            }
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);