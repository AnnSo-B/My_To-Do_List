// npm imports

// local imports
import { FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_ERROR } from '../actions';

// state
const initialState = {
  categoryList: [],
  fetchError: '',
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: [
          ...action.payload
        ],
        fetchError: '',
      };
    case FETCH_CATEGORY_LIST_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      }
    default: 
      return state;
  }
};
