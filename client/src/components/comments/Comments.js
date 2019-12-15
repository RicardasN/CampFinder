import React from 'react';
import CommentItem from './CommentItem';
import AddCommentModal from '../comments/AddCommentModal';

const Comments = () => {
  const comment = {
    author: 'User',
    text: 'This is a very interesting comment text',
    createdAt: '2019-10-19T12:59-0500'
  };

  return (
    <div className="row">
      <div className="col s12">
        <div className="card-panel grey lighten-3">
          <div className="row">
            <div className="col s12 m6">
              <h5>
                <i className="fas fa-comment-alt"></i> Comments
              </h5>
            </div>
            <div className="col s12 m6">
              <a
                className="waves-effect waves-light teal btn right white-text modal-trigger"
                href="#add-comment-modal"
              >
                <i
                  className="fas fa-plus"
                  aria-hidden="true"
                  style={{ fontSize: '1rem' }}
                ></i>{' '}
                Add a comment
              </a>
              <AddCommentModal />
            </div>
          </div>
          <div className="divider" />
          <div className="row">
            <CommentItem comment={comment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
