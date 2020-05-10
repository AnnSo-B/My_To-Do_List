// npm imports

// local imports
import { FETCH_TASK_LIST_SUCCESS, FETCH_TASK_LIST_ERROR } from '../actions';

// state
const initialState = {
  taskList: [],
  fetchError: '',
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TASK_LIST_SUCCESS: 
      return {
        ...state,
        taskList: action.payload,
      }
    case FETCH_TASK_LIST_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      }
    default: 
      return state;
  }
};
