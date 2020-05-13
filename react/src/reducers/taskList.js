// npm imports

// local imports
import {
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_ERROR,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_ERROR,
  TASK_DELETION_SUCCESS,
  TASK_DELETION_ERROR,
} from '../actions';

// state
const initialState = {
  taskList: [],
  fetchError: '',
};

// reducer
export default (state = initialState, action = {}) => {
  let updatedTaskList = [];

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
      updatedTaskList = state.taskList.map((task) => {
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
    case TASK_UPDATE_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
    case TASK_DELETION_SUCCESS:
      // keep only tasks which don't have as id the id of the deleted task
      updatedTaskList = state.taskList.filter((task) => {
        if (task.id !== action.payload) {
          return task;
        };
      });
      return {
        ...state,
        fetchError: '',
        taskList: [
          ...updatedTaskList,
        ],
      };
    case TASK_DELETION_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
  default: 
      return state;
  }
};
