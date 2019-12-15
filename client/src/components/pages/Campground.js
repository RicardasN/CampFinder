import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import Comments from '../comments/Comments';
import Reviews from '../ratings/Reviews';

const Campground = () => {
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div
            className="card large"
            style={{ fontSize: '1rem', minHeight: '800px' }}
          >
            <div className="card-image">
              <img src="https://images.unsplash.com/photo-1576226733354-e98bd78e5bf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
            </div>
            <div className="card-content">
              <div className="row">
                <h4>
                  Campground Name{' '}
                  <span className="right" style={{ fontSize: '1.5rem' }}>
                    22 eur / night
                  </span>
                </h4>
              </div>
              <div className="row">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively. Laboris elit fugiat eu fugiat eu sunt
                  veniam tempor velit. Mollit non id exercitation cillum
                  cupidatat exercitation minim. Eiusmod irure cillum elit
                  consequat culpa ex. Sint reprehenderit magna consequat officia
                  elit irure dolore nulla labore. Ad adipisicing sunt sunt anim
                  officia esse est ex ex. Cupidatat esse duis duis adipisicing
                  ut sit culpa qui nulla nisi. Et eiusmod fugiat tempor labore
                  quis ipsum amet.
                </p>
              </div>
            </div>
            <div className="card-action">
              <p>
                Submited by <span className="teal-text">User</span>
                <span className="right">10 days ago</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
      <Comments />
    </div>
  );
};

export default Campground;
