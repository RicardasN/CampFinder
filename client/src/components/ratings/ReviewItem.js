import React from 'react';

const ReviewItem = ({ review: { text, author, rating } }) => {
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
          Review by: <span className="teal-text">{author}</span>
        </div>
        <p>{text}</p>
      </span>
    </div>
  );
};

export default ReviewItem;
