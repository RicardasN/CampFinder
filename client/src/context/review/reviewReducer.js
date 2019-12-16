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

export default (state, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        reload: false
      };
    case GET_REVIEW:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        loading: false
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.payload._id ? action.payload : review
        ),
        loading: false,
        current: null,
        reload: true
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
        loading: false
      };
    case SET_CURRENT_REVIEW:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_REVIEW:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REVIEW_ERROR:
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
