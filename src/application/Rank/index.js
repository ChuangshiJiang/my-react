import React, { memo, useEffect } from 'react';
import { getRankList } from './store/index';
import { connect } from 'react-redux';
import { filterIndex,filterIdx } from '../../api/utils';
import { Container, List, ListItem, SongList } from './style';
import { EnterLoading } from '../../application/Singers/style';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading';
import { renderRoutes } from 'react-router-config';

function Rank (props) {
  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  useEffect(() => {
    getRankListDataDispatch();
  }, []);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item,index) => {
            return (
              <ListItem key={item.coverImgUrl} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className='img_wrapper'>
                  <img src={item.coverImgUrl} alt="" />
                  <div className='decorate'></div>
                  <span className='update_frequency'>{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongList = list => {
    if (list.length) {
      return (
        <SongList>
          {
            list.map((item, index) => {
              return <li key={index}>{index + 1}.{item.first} - {item.second}</li>
            })
          }
        </SongList>
      );
    }
    return null;
  }

  let displayStyle = loading ? {"display":"none"} : {"display":""};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className='official' style={displayStyle}>官方榜</h1>
          {
            renderRankList(officialList)
          }
          <h1 className='global' style={displayStyle}>全球榜</h1>
          {
            renderRankList(globalList,true)
          }
          {
            loading && 
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          }
        </div>
      </Scroll>
      {
        renderRoutes(props.route.routes)
      }
    </Container>
  );
}

//映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
});

//映射 dispatch 到组件的 props 上
const mapDispatchToProps = (dispatch) => ({
  getRankListDataDispatch () {
    dispatch(getRankList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank));
