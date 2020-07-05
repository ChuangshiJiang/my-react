import React, { Fragment, useEffect, useState, useRef } from 'react';

function Index (props) {
  const [count, setCount] = useState(0);
  const dom = useRef(null);

  useEffect(() => {
    dom.current.addEventListener('click', () => setCount(count + 1));
  }, []);

  const { title, content } = props;
  return (
    <Fragment>
      <div className="index">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
      <div ref={dom}>{count}</div>
    </Fragment>
  );
}

export default Index;