import { RankTypes } from './config';
export const getCount = (count) => {
  if (count < 0) return;
  if (count < 1000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

export const debounce = (func, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    let _this = this;
    let args = arguments;
    timer = setTimeout(() => {
      func.apply(_this, args)
    }, delay);
  }
}
//处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}
//找出排行榜的编号
export const filterIdx = (name) => {
  for (let key in RankTypes) {
    if (RankTypes[key] === name) {
      return key;
    }
  }
  return null;
}

//处理歌手列表，拼接歌手名字
export const getName = (list) => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
}

export const isEmptyObj = obj => !obj || Object.keys(obj).length === 0;

let elementStyle = document.createElement('div').style;

let vendor = (()=>{
  //首先通过 transition 属性判断是何种浏览器
  let transformNames = {
    webkit: "webkitTransform",
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransfrom',
    standard: 'Transfrom'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if(vendor === false){
    return false;
  }
  if(vendor === "standard"){
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function getSongUrl(id){
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

//转换歌曲播放时间
export const formatPlayTime = interval => {
  interval = interval | 0;// |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};