import React, { createContext, useReducer } from 'react';
import { fromJS } from 'immutable';

//context
export const CategoryDataContext = createContext({});

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHAGE_ALPHA = 'CHAGE_ALPHA';

const reducer = (state, action) => {
  switch (action.key) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHAGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
}

//Provider 组件
export const Data = props => {
  //useReducer 的第二个参数传入初始值
  const [data,dispatch] = useReducer(reducer,fromJS({
    category: '',
    alpha: ''
  }));

  return (
    <CategoryDataContext.Provider value={{data,dispatch}}>
      {props.children}
    </CategoryDataContext.Provider>
  );
}