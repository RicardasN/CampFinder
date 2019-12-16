import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReviewItem from './ReviewItem';
import AddReviewModal from './AddReviewModal';

const Reviews = ({ reviews, rating, campgroundID }) => {
  const [toggleModal, setToggleModal] = useState(false);

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
                <em>(total reviews: {reviews.length})</em>
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
                    timeout={500}
                    classNames="section"
                  >
                    <ReviewItem review={review} />
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
