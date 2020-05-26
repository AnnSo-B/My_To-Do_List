// npm imports

// local imports
import {
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_ERROR,
  CHANGE_CATEGORY_NAME,
  SUBMIT_NEW_CATEGORY_ERROR,
} from '../actions';

// state
const initialState = {
  categoryList: [],
  fetchMessage: '',
  category: {
    id: null,
    name: '',
    status: 1,
  }
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: [
          ...action.payload.categoryList
        ],
        fetchMessage: '',
        category: {
          id: null,
          name: '',
          status: 1,
        }
      };
    case FETCH_CATEGORY_LIST_ERROR: 
      return {
        ...state,
        fetchMessage: action.payload,
      };
    case CHANGE_CATEGORY_NAME: 
      return {
        ...state,
        category: {
          id: null,
          name: action.payload,
          status: 1,
        }
      };
    case SUBMIT_NEW_CATEGORY_ERROR:
      return {
        ...state,
        fetchMessage: action.payload,
      }
    default: 
      return state;
  }
};
