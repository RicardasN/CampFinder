import React, { useState, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReviewItem from './ReviewItem';
import AddReviewModal from './AddReviewModal';
import ReviewContext from '../../context/review/reviewContext';
import AlertContext from '../../context/alert/alertContext';

const Reviews = ({ rating, campgroundID }) => {
  const context = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);

  const { reviews, getReviews, error, clearErrors } = context;
  const { setAlert } = alertContext;

  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    getReviews(campgroundID);
    if (error !== null && typeof error != 'undefined') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, reviews, campgroundID, rating]);

  return (
    <div className="row">
      <div className="col s12">
        <div className="card-panel white lighten-3">
          <div className="row">
            <div className="col s12 m6">
              <h5>Reviews</h5>
              <p>
                {[1, 2, 3, 4, 5].map(ratingValue =>
                  ratingValue <= rating ? (
                    <span className="fas fa-star" key={ratingValue} />
                  ) : (
                    <span className="far fa-star" key={ratingValue} />
                  )
                )}
                <em>(total reviews: {reviews ? reviews.length : 0})</em>
              </p>
              <p>
                Current campground rating: <strong>{rating.toFixed(2)}</strong>
              </p>
            </div>
            <div className="col s12 m6">
              <a
                className="waves-effect waves-light teal btn right white-text modal-trigger"
                href="#add-review-modal"
                onClick={() => {
                  setToggleModal(!toggleModal);
                }}
              >
                <i className="fas fa-plus" style={{ fontSize: '1rem' }}></i> Add
                a review
              </a>
            </div>
            <AddReviewModal
              toggle={toggleModal}
              setToggle={setToggleModal}
              campgroundID={campgroundID}
            />
          </div>
          <div className="divider" />
          <div className="row">
            {reviews && reviews.length > 0 ? (
              <TransitionGroup>
                {reviews.map(review => (
                  <CSSTransition
                    key={review._id}
                    timeout={1000}
                    classNames="section"
                  >
                    <ReviewItem review={review} campgroundId={campgroundID} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            ) : (
              <p>No reviews as of yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
