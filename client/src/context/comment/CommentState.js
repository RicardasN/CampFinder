import React, { useReducer } from 'react';
import axios from 'axios';
import CampgroundContext from './campgroundContext';
import campgroundReducer from './campgroundReducer';
import {
  GET_CAMPGROUND,
  GET_CAMPGROUNDS,
  ADD_CAMPGROUND,
  DELETE_CAMPGROUND,
  SET_CURRENT_CAMPGROUND,
  CLEAR_CURRENT_CAMPGROUND,
  UPDATE_CAMPGROUND,
  CAMPGROUND_ERROR,
  SET_LOADING,
  CLEAR_ERRORS
} from '../types';

const CampgroundState = props => {
  const initialState = {
    campgrounds: null,
    current: null,
    loading: true,
    error: null
  };
  //state lets us access object in our state and dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(campgroundReducer, initialState);

  //Get Campgrounds
  const getCampgrounds = async () => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get('/api/campgrounds');
      dispatch({ type: GET_CAMPGROUNDS, payload: res.data });
    } catch (error) {
      dispatch({ type: CAMPGROUND_ERROR, payload: error.response.msg });
    }
  };

  //Get Campground
  const getCampground = async id => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(`/api/campgrounds/${id}`);
      dispatch({ type: GET_CAMPGROUND, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CAMPGROUND_ERROR, payload: error.response.msg });
    }
  };

  //Add Campground
  const addCampground = async campgroundData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.post('/api/campgrounds', campgroundData, config);
      dispatch({ type: ADD_CAMPGROUND, payload: res.data });
    } catch (error) {
      dispatch({ type: CAMPGROUND_ERROR, payload: error.response.data.error });
    }
  };
  //Delete Campground
  const deleteCampground = async id => {
    try {
      dispatch({ type: SET_LOADING });
      await axios.delete(`/api/campgrounds/${id}`);
      dispatch({ type: DELETE_CAMPGROUND, payload: id });
    } catch (error) {
      dispatch({ type: CAMPGROUND_ERROR, payload: error.response.msg });
    }
  };
  //Update Campground
  const updateCampground = async campground => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.put(
        `/api/campgrounds/${campground._id}`,
        campground,
        config
      );
      dispatch({ type: UPDATE_CAMPGROUND, payload: res.data });
    } catch (error) {
      dispatch({ type: CAMPGROUND_ERROR, payload: error.response.statusText });
    }
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  //Set Current Campground
  const setCurrentCampground = campground => {
    dispatch({ type: SET_CURRENT_CAMPGROUND, payload: campground });
  };
  //Clear Current Campground
  const clearCurrentCampground = () => {
    dispatch({ type: CLEAR_CURRENT_CAMPGROUND });
  };
  return (
    <CampgroundContext.Provider
      value={{
        campgrounds: state.campgrounds,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getCampgrounds,
        getCampground,
        addCampground,
        deleteCampground,
        updateCampground,
        setCurrentCampground,
        clearCurrentCampground,
        clearErrors
      }}
    >
      {props.children}
    </CampgroundContext.Provider>
  );
};

export default CampgroundState;
