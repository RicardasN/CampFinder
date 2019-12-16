import React, { useReducer } from 'react';
import axios from 'axios';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';
import {
  GET_REVIEWS,
  GET_REVIEW,
  ADD_REVIEW,
  DELETE_REVIEW,
  SET_CURRENT_REVIEW,
  CLEAR_CURRENT_REVIEW,
  UPDATE_REVIEW,
  REVIEW_ERROR,
  SET_LOADING,
  CLEAR_ERRORS
} from '../types';

const ReviewState = props => {
  const initialState = {
    reviews: null,
    current: null,
    loading: true,
    error: null
  };
  //state lets us access object in our state and dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  //Get Reviews
  const getReviews = async campgroundId => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(`/api/campgrounds/${campgroundId}/reviews`);
      dispatch({ type: GET_REVIEWS, payload: res.data });
    } catch (error) {
      dispatch({ type: REVIEW_ERROR, payload: error.response.msg });
    }
  };

  //Get Review
  const getReview = async (campgroundId, id) => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(
        `/api/campgrounds/${campgroundId}/reviews/${id}`
      );
      dispatch({ type: GET_REVIEW, payload: res.data });
    } catch (error) {
      dispatch({ type: REVIEW_ERROR, payload: error.response.msg });
    }
  };

  //Add Review
  const addReview = async (campgroundId, reviewData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.post(
        `/api/campgrounds/${campgroundId}/reviews`,
        reviewData,
        config
      );
      dispatch({ type: ADD_REVIEW, payload: res.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: REVIEW_ERROR, payload: error.response.data.msg });
    }
  };
  //Delete Review
  const deleteReview = async (campgroundId, id) => {
    try {
      dispatch({ type: SET_LOADING });
      await axios.delete(`/api/campgrounds/${campgroundId}/reviews/${id}`);
      dispatch({ type: DELETE_REVIEW, payload: id });
    } catch (error) {
      dispatch({ type: REVIEW_ERROR, payload: error.response.msg });
    }
  };
  //Update Review
  const updateReview = async (campgroundId, reviewData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.put(
        `/api/campgrounds/${campgroundId}/reviews/${reviewData._id}`,
        reviewData,
        config
      );
      dispatch({ type: UPDATE_REVIEW, payload: res.data });
    } catch (error) {
      dispatch({ type: REVIEW_ERROR, payload: error.response.statusText });
    }
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  //Set Current Review
  const setCurrentReview = review => {
    dispatch({ type: SET_CURRENT_REVIEW, payload: review });
  };
  //Clear Current Review
  const clearCurrentReview = () => {
    dispatch({ type: CLEAR_CURRENT_REVIEW });
  };
  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getReviews,
        getReview,
        addReview,
        deleteReview,
        updateReview,
        setCurrentReview,
        clearCurrentReview,
        clearErrors
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
