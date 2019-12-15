import React from 'react';
import Moment from 'react-moment';

const CommentItem = ({comment: {author, createdAt, text}}) => {
  return (
      <div className="section">
        <h6>
          <i className="fas fa-user" /> {author}
          <span className="right" style={{ fontSize: '1rem' }}>
            <Moment fromNow>{createdAt}</Moment>
          </span>
        </h6>
        <p>{text}</p>
      </div>
  );
};

export default CommentItem;
