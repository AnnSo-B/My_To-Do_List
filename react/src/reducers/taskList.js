// npm imports

// local imports
import {
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_ERROR,
  TASK_UPDATE_SUCCESS,
} from '../actions';

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
        fetchError: '',
      };
    case FETCH_TASK_LIST_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
    case TASK_UPDATE_SUCCESS: 
      const updatedTaskList = state.taskList.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload
        }
        return task;
      });
      return {
        ...state,
        fetchError: '',
        taskList: [
          ...updatedTaskList,
        ],
      };
    default: 
      return state;
  }
};
