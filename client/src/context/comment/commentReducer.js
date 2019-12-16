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

export default (state, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case GET_COMMENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload._id ? action.payload : comment
        ),
        loading: false,
        current: action.payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};
