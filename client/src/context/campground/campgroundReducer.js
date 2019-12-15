import {
  GET_CAMPGROUND,
  GET_CAMPGROUNDS,
  ADD_CAMPGROUND,
  DELETE_CAMPGROUND,
  SET_CURRENT_CAMPGROUND,
  CLEAR_CURRENT_CAMPGROUND,
  UPDATE_CAMPGROUND,
  CAMPGROUND_ERROR,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: action.payload,
        loading: false
      };
    case GET_CAMPGROUND:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case ADD_CAMPGROUND:
      return {
        ...state,
        campgrounds: [action.payload, ...state.campgrounds],
        loading: false
      };
    case UPDATE_CAMPGROUND:
      return {
        ...state,
        campgrounds: state.campgrounds.map(campground =>
          campground._id === action.payload._id ? action.payload : campground
        ),
        loading: false,
        current: null
      };
    case DELETE_CAMPGROUND:
      return {
        ...state,
        campgrounds: state.campgrounds.filter(
          campground => campground._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT_CAMPGROUND:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_CAMPGROUND:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CAMPGROUND_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
