// npm imports

// local imports
import {
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_API_MESSAGE,
  CHANGE_NEW_TASK_CATEGORY,
  DISPLAY_NEW_CATEGORY_INPUT,
  CHANGE_CATEGORY_NAME,
  RESET_NEW_TASK_CATEGORY,
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
    case FETCH_CATEGORY_API_MESSAGE: 
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
    case RESET_NEW_TASK_CATEGORY:
      return {
        ...state,
        newTaskCategory: 0,
      }
    default: 
      return state;
  }
};
