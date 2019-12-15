import React from 'react';
import ReviewItem from './ReviewItem';
import AddReviewModal from './AddReviewModal';

const Reviews = () => {
  const review = {
    text: 'This is a very informative review content text',
    author: 'User',
    rating: 4
  };

  return (
    <div className="row">
      <div className="col s12">
        <div className="card-panel white lighten-3">
          <div className="row">
            <div className="col s12 m6">
              <h5>Reviews</h5>
              <p>
                {[1, 2, 3, 4, 5].map(ratingValue =>
                  ratingValue <= 4 ? (
                    <span className="fas fa-star" key={ratingValue} />
                  ) : (
                    <span className="far fa-star" key={ratingValue} />
                  )
                )}
                <em>(total reviews: {10})</em>
              </p>
              <p>
                Current campground rating: <strong>{(4.0).toFixed(2)}</strong>
              </p>
            </div>
            <div className="col s12 m6">
              <a
                className="waves-effect waves-light teal btn right white-text modal-trigger"
                href="#add-review-modal"
              >
                <i
                  className="fas fa-plus"
                  aria-hidden="true"
                  style={{ fontSize: '1rem' }}
                ></i>{' '}
                Add a review
              </a>
              <AddReviewModal />
            </div>
          </div>
          <div className="divider" />
          <div className="row">
            <ReviewItem review={review} />
            <ReviewItem review={review} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
