import React, { useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router';
import Moment from 'react-moment';
import Comments from '../comments/Comments';
import Reviews from '../ratings/Reviews';
import Preloader from '../layout/Preloader';
import Alerts from '../layout/Alerts';
import CampgroundContext from '../../context/campground/campgroundContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Campground = () => {
  const alertContext = useContext(AlertContext);
  const context = useContext(CampgroundContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  let { id } = useParams();

  const { getCampground, current, loading, error, clearErrors } = context;

  useEffect(() => {
    getCampground(id);
    authContext.loadUser();
    if (error !== null && typeof error != 'undefined') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);
  return (
    <div className="container">
      <Alerts />
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
          <Reviews
            reviews={current.reviews}
            rating={current.rating}
            campgroundID={id}
          />
          <Comments campId={id} />
        </Fragment>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default Campground;
