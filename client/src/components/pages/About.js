import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

export const About = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1>About This App</h1>
      <p className="my-1">
        This is a full stack React app for finding perfect campgrounds. Created
        to learn more about React and full stack web applications by RicardasN.
      </p>
      <p className="bg-dark p">
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
