import React, { useState, useContext } from 'react';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';

const AddCommentModal = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [text, setText] = useState('');

  const onSubmit = () => {
    if (text === '') {
      setAlert('Comment cannot be empty', 'danger');
    }
  };

  return (
    <div id="add-comment-modal" className="modal">
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
