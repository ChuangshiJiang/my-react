import React, { Fragment } from 'react';

function Index (props) {
  const { title, content } = props;
  return (
    <Fragment>
      <div className="index">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
    </Fragment>

  );
}

export default Index;