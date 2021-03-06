import React, { useContext, useEffect } from 'react';
import Campgrounds from '../campgrounds/Campgrounds';
import AddButton from '../layout/AddButton';
import AddCampgroundModal from '../campgrounds/AddCampgroundModal';
import Alerts from '../layout/Alerts';
import AuthContext from '../../context/auth/authContext';

export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container" style={{ width: '90%' }}>
      <Alerts />
      <AddButton />
      <AddCampgroundModal />
      <Campgrounds />
    </div>
  );
};

export default Home;
