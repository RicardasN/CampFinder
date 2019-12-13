import React from 'react';

const CampgroundItem = () => {
  return (
    <div className="card">
      <div className="card-image">
        <img src="https://images.unsplash.com/photo-1575948864484-583bc327e60a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        <span className="card-title">Card Title</span>
      </div>
      <div className="card-content">
        <p>
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
      </div>
      <div className="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
  );
};

export default CampgroundItem;
