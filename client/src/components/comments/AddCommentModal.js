import React, { useState, useContext } from 'react';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import CommentContext from '../../context/comment/commentContext';

const display = {
  zIndex: '1003',
  display: 'block',
  opacity: '1',
  top: '10%',
  transform: 'scaleX(1) scaleY(1)'
};
const hide = {
  display: 'none'
};

const AddCommentModal = ({ toggle, setToggle, campgroundId }) => {
  const alertContext = useContext(AlertContext);
  const commentContext = useContext(CommentContext);
  const { setAlert } = alertContext;
  const { addComment } = commentContext;

  const [text, setText] = useState('');

  const onSubmit = () => {
    if (text === '') {
      setAlert('Comment cannot be empty', 'danger');
    } else {
      addComment(campgroundId, { text });
      setText('');
      setToggle(!toggle);
    }
  };

  return (
    <div
      id="add-comment-modal"
      className="modal"
      style={toggle ? display : hide}
    >
      <div className="modal-content">
        <Alerts />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Comment
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <a
            className="waves-effect waves-light btn-large"
            href="#!"
            onClick={onSubmit}
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddCommentModal;
