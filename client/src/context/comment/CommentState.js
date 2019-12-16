import React, { useReducer } from 'react';
import axios from 'axios';
import CommentContext from './commentContext';
import commentReducer from './commentReducer';
import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT,
  UPDATE_COMMENT,
  COMMENT_ERROR,
  SET_LOADING,
  CLEAR_ERRORS
} from '../types';

const CommentState = props => {
  const initialState = {
    comments: null,
    current: null,
    loading: true,
    error: null
  };
  //state lets us access object in our state and dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(commentReducer, initialState);

  //Get Comments
  const getComments = async campgroundId => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(`/api/campgrounds/${campgroundId}/comments`);
      dispatch({ type: GET_COMMENTS, payload: res.data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR, payload: error.response.msg });
    }
  };

  //Get Comment
  const getComment = async (campgroundId, id) => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(
        `/api/campgrounds/${campgroundId}/comments/${id}`
      );
      dispatch({ type: GET_COMMENT, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: COMMENT_ERROR, payload: error.response.msg });
    }
  };

  //Add Comment
  const addComment = async (campgroundId, commentData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.post(
        `/api/campgrounds/${campgroundId}/comments`,
        commentData,
        config
      );
      dispatch({ type: ADD_COMMENT, payload: res.data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR, payload: error.response.data.msg });
    }
  };
  //Delete Comment
  const deleteComment = async (campgroundId, id) => {
    try {
      dispatch({ type: SET_LOADING });
      await axios.delete(`/api/campgrounds/${campgroundId}/comments/${id}`);
      dispatch({ type: DELETE_COMMENT, payload: id });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR, payload: error.response.msg });
    }
  };
  //Update Comment
  const updateComment = async (campgroundId, commentData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.put(
        `/api/campgrounds/${campgroundId}/comments/${commentData._id}`,
        commentData,
        config
      );
      dispatch({ type: UPDATE_COMMENT, payload: res.data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR, payload: error.response.statusText });
    }
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  //Set Current Comment
  const setCurrentComment = campground => {
    dispatch({ type: SET_CURRENT_COMMENT, payload: campground });
  };
  //Clear Current Comment
  const clearCurrentComment = () => {
    dispatch({ type: CLEAR_CURRENT_COMMENT });
  };
  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getComments,
        getComment,
        addComment,
        deleteComment,
        updateComment,
        setCurrentComment,
        clearCurrentComment,
        clearErrors
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;
