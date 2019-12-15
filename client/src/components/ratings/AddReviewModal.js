import React, { useState, useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import isImageUrl from 'is-image-url';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';

const AddReviewModal = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const onSubmit = () => {
    if (text === '') {
      setAlert('Review text cannot be empty', 'danger');
    } else if (rating === 0) {
      setAlert('Please select a rating for your review', 'danger');
    } else {
      console.log({ text, rating });
      setText('');
      setRating(0);
    }
  };

  return (
    <div id="add-review-modal" className="modal">
      <div className="modal-content">
        <h4>Add a review</h4>
        <Alerts />
        <div className="row">
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                value={5}
                checked={rating === 5}
                onChange={() => setRating(5)}
              />
              <span>
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
              </span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                value={4}
                checked={rating === 4}
                onChange={() => setRating(4)}
              />
              <span>
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="far fa-star" />
              </span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                value={3}
                checked={rating === 3}
                onChange={() => setRating(3)}
              />
              <span>
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
              </span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                value={2}
                checked={rating === 2}
                onChange={() => setRating(2)}
              />
              <span>
                <span className="fas fa-star" />
                <span className="fas fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
              </span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                value={1}
                checked={rating === 1}
                onChange={() => setRating(1)}
              />
              <span>
                <span className="fas fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
                <span className="far fa-star" />
              </span>
            </label>
          </p>
          <div className="input-field">
            <input
              type="text"
              name="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Comment about your choice of rating
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

export default AddReviewModal;
