import React, { useEffect, useContext, useState } from 'react';
import CommentItem from './CommentItem';
import AddCommentModal from '../comments/AddCommentModal';
import CommentContext from '../../context/comment/commentContext';
import AlertContext from '../../context/alert/alertContext';

const Comments = ({ campId }) => {
  const commentContext = useContext(CommentContext);
  const alertContext = useContext(AlertContext);

  const { getComments, comments, error, clearErrors } = commentContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    getComments(campId);
    if (error !== null && typeof error != 'undefined') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, comments, campId]);

  const [toggleModal, setToggleModal] = useState(false);

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
                onClick={() => {
                  setToggleModal(!toggleModal);
                }}
              >
                <i
                  className="fas fa-plus"
                  aria-hidden="true"
                  style={{ fontSize: '1rem' }}
                ></i>{' '}
                Add a comment
              </a>
              <AddCommentModal
                toggle={toggleModal}
                setToggle={setToggleModal}
                campgroundId={campId}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="row">
            {comments && comments.length > 0 ? (
              comments.map(comment => (
                <CommentItem
                  comment={comment}
                  key={comment._id}
                  campgroundId={campId}
                />
              ))
            ) : (
              <p>No comments as of yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
