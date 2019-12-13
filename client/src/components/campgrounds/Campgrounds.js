import React from 'react';
import CampgroundItem from './CampgroundItem';

const Campgrounds = () => {
  return (
    <div className="row">
      {[0, 1, 2, 3, 4, 5, 6].map(value => (
        <div className="col s12 m6 xl4" key={value}>
          <CampgroundItem />
        </div>
      ))}
    </div>
  );
};

export default Campgrounds;
