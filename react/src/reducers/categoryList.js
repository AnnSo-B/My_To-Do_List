// npm imports

// local imports
import { FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_ERROR } from '../actions';

// state
const initialState = {
  categoryList: [],
  fetchMessage: '',
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
        fetchMessage: '',
      };
    case FETCH_CATEGORY_LIST_ERROR: 
      return {
        ...state,
        fetchMessage: action.payload,
      }
    default: 
      return state;
  }
};
