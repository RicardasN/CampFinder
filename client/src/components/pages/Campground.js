import React, { useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router';
import Moment from 'react-moment';
import Comments from '../comments/Comments';
import Reviews from '../ratings/Reviews';
import Preloader from '../layout/Preloader';
import CampgroundContext from '../../context/campground/campgroundContext';

const Campground = () => {
  let { id } = useParams();
  const context = useContext(CampgroundContext);
  const { getCampground, current, loading } = context;

  useEffect(() => {
    getCampground(id);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {current && !loading ? (
        <Fragment>
          <div className="row">
            <div className="col s12">
              <div
                className="card large"
                style={{ fontSize: '1rem', minHeight: '800px' }}
              >
                <div className="card-image">
                  <img src={`${current.image}`} alt="campground" />
                </div>
                <div className="card-content">
                  <div className="row">
                    <h4>
                      {current.name}{' '}
                      <span className="right" style={{ fontSize: '1.5rem' }}>
                        {current.price.toFixed(2)} eur / night
                      </span>
                    </h4>
                  </div>
                  <div className="row">
                    <p>{current.description}</p>
                  </div>
                </div>
                <div className="card-action">
                  <p>
                    Submited by{' '}
                    <span className="teal-text">{current.author.name}</span>
                    <span className="right">
                      <Moment fromNow>{current.createdAt}</Moment>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Reviews reviews={current.reviews} rating={current.rating} />
          <Comments comments={current.comments} />
        </Fragment>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default Campground;
