import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundItem = ({ campground: { name, image, description, _id } }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={`${image}`} alt="campground" />
        <span className="card-title">{name}</span>
      </div>
      <div className="card-content">
        <p>{description.substring(0, 40)}...</p>
      </div>
      <div className="card-action">
        <Link to={`/campgrounds/${_id}`}>View</Link>
      </div>
    </div>
  );
};

export default CampgroundItem;
