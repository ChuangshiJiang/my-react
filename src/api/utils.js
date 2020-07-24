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