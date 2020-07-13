import React, { Fragment, useState } from 'react';

function Index (props) {
  const [count, setCount] = useState(-100);
  const { title, content } = props;

  const handleAdd = (step = 1) => {
    return () => {
      setCount(count + step);
    }
  }

  return (
    <Fragment>
      <div className="index">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
      <div>{count}</div>
      <button onClick={handleAdd(10)}> Click Me </button>
    </Fragment>
  );
}

export default Index;