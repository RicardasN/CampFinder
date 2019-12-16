import React, { useContext, useState, Fragment } from 'react';
import Moment from 'react-moment';
import AuthContext from '../../context/auth/authContext';
import CommentContext from '../../context/comment/commentContext';
import EditCommentModal from './EditCommentModal';

const CommentItem = ({ comment, campgroundId }) => {
  const authContext = useContext(AuthContext);
  const commentContext = useContext(CommentContext);

  const { user } = authContext;
  const { setCurrentComment, deleteComment } = commentContext;

  const [toggleEdit, setToggleEdit] = useState(false);
  const { author, createdAt, text } = comment;

  const onEdit = () => {
    setCurrentComment(comment);
    setToggleEdit(!toggleEdit);
  };

  const onDelete = () => {
    deleteComment(campgroundId, comment._id);
  };

  return (
    <div className="section">
      <h6>
        <i className="fas fa-user" /> {author.name}
        <span className="right" style={{ fontSize: '1rem' }}>
          <Moment fromNow>{createdAt}</Moment>
        </span>
      </h6>
      <p>{text}</p>
      <span className="right">
        {(user && user._id === author._id) || (user && user.isAdmin) ? (
          <Fragment>
            <a
              className="waves-effect waves-light modal-trigger"
              href="#edit-comment-modal"
              onClick={onEdit}
            >
              <i className="fas fa-edit"></i>
            </a>
            <a
              href="#!"
              onClick={onDelete}
              className="red-text"
              style={{ marginLeft: '10px' }}
            >
              <i className="fas fa-trash-alt"></i>
            </a>
          </Fragment>
        ) : (
          ''
        )}
      </span>
      <EditCommentModal toggle={toggleEdit} setToggle={setToggleEdit} />
    </div>
  );
};

export default CommentItem;
