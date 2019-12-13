import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    //If a token was sent to this function we add a global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    //Else we remove it
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
