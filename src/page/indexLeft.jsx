import React, { Fragment, useState, useEffect } from 'react';

export default function IndexUseHooks (props) {
  const [count, setCount] = useState(0);
  const { title, content,initialCount = 0 } = props;

  const handleAdd = (step = 1) => {
    return () => {
      setCount(prevCount => prevCount + step);
    }
  }

  const handleDec = (step = 1) => {
    return () => {
      setCount(prevCount => prevCount - step);
    }
  }

  const handleReset = (initialCount) => {
    return () => {
      setCount(initialCount);
    }
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <Fragment>
      <div className="index">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
      <p>You clicked {count} times</p>
      <button onClick={handleReset(initialCount)}>Reset</button>
      <button onClick={handleAdd()}>+</button>
      <button onClick={handleDec()}>-</button>
    </Fragment>
  );
}