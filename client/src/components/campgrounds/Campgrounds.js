import React, { useContext, useEffect } from 'react';
import CampgroundItem from './CampgroundItem';
import CampgroundContext from '../../context/campground/campgroundContext';
import Preloader from '../layout/Preloader';

const Campgrounds = () => {
  const campgroundContext = useContext(CampgroundContext);
  const { getCampgrounds, campgrounds, loading } = campgroundContext;

  useEffect(() => {
    getCampgrounds();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      {campgrounds && !loading ? (
        campgrounds.map(value => (
          <div className="col s12 m6 xl4" key={value._id}>
            <CampgroundItem campground={value} />
          </div>
        ))
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default Campgrounds;
