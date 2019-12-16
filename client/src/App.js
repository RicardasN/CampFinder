import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Campground from './components/pages/Campground';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import CampgroundState from './context/campground/campgroundState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CommentState from './context/comment/CommentState';
import setAuthToken from './utils/setAuthToken';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
    // eslint-disable-next-line
  });

  return (
    <AuthState>
      <CampgroundState>
        <CommentState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar title="Camp Finder" icon="fas fa-campground" />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/campgrounds/:id" component={Campground} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </CommentState>
      </CampgroundState>
    </AuthState>
  );
};

export default App;
