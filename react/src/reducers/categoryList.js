// npm imports

// local imports
import {
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_ERROR,
  CHANGE_NEW_TASK_CATEGORY,
  DISPLAY_NEW_CATEGORY_INPUT,
  CHANGE_CATEGORY_NAME,
  SUBMIT_NEW_CATEGORY_ERROR,
} from '../actions';

// state
const initialState = {
  categoryList: [],
  fetchMessage: '',
  newTaskCategory: 0,
  newCategory: false,
  category: {
    name: '',
    status: 1,
  },
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
        newTaskCategory: action.payload.newCategoryId,
        newCategory: false,
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
    case CHANGE_NEW_TASK_CATEGORY: 
      return {
        ...state,
        newTaskCategory: action.payload,
      };
    case  DISPLAY_NEW_CATEGORY_INPUT:
      return {
        ...state,
        newCategory: true,
      };
    case CHANGE_CATEGORY_NAME: 
      return {
        ...state,
        category: {
          ...state.category,
          name: action.payload,
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
