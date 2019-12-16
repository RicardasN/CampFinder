import React, { useContext, useState, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ReviewContext from '../../context/review/reviewContext';
import EditReviewModal from './EditReviewModal';

const ReviewItem = ({ review, campgroundId }) => {
  const authContext = useContext(AuthContext);
  const reviewContext = useContext(ReviewContext);

  const { user } = authContext;
  const { setCurrentReview, deleteReview } = reviewContext;

  const [toggleEdit, setToggleEdit] = useState(false);
  const { author, rating, text } = review;

  const onEdit = () => {
    setCurrentReview(review);
    setToggleEdit(!toggleEdit);
  };

  const onDelete = () => {
    deleteReview(campgroundId, review._id);
  };

  return (
    <div className="section">
      <span>
        {[1, 2, 3, 4, 5].map(ratingValue =>
          ratingValue <= rating ? (
            <span className="fas fa-star" key={ratingValue} />
          ) : (
            <span className="far fa-star" key={ratingValue} />
          )
        )}
        <div style={{ display: 'inline', marginLeft: '10px' }}>
          Review by: <span className="teal-text">{author.name}</span>
        </div>
        <p>{text}</p>
      </span>
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
      <EditReviewModal
        toggle={toggleEdit}
        setToggle={setToggleEdit}
        campgroundId={campgroundId}
      />
    </div>
  );
};

export default ReviewItem;
