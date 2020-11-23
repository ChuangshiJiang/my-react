import React, { useRef } from 'react';
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';

function MiniPlayer (props) {
  const { song, fullScreen } = props;
  const { toggleFullScreenDispatch } = props;
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
            <img src={song.al.picUrl} alt="img" height="40" width="40" className="MiniPlayer" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);