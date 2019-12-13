import React from 'react';

const AddButton = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-campground-modal"
        className="btn-floating btn-large btn-darken-2 modal-trigger"
      >
        <i className="fas fa-plus"></i>
      </a>
    </div>
  );
};

export default AddButton;
