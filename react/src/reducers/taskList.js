// npm imports

// local imports
import {
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_ERROR,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_ERROR,
  TASK_DELETION_SUCCESS,
  TASK_DELETION_ERROR,
  TASK_EDIT,
} from '../actions';

// state
const initialState = {
  taskList: [],
  fetchError: '',
  currentTaskTitle: '',
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
    case TASK_EDIT:
      const taskToEditId = parseInt(action.payload.taskId);
      updatedTaskList = state.taskList.map((task) => {
        if (task.id === taskToEditId) {
          return {
            ...task,
            status: 4,
          }
        }
        return task;
      });
      const updatedTaskTitleToEdit = state.taskList.find(task => task.id === taskToEditId).title;
      console.log(updatedTaskTitleToEdit);
      return {
        ...state,
        fetchError: '',
        taskList: [
          ...updatedTaskList,
        ],
        currentTaskTitle: updatedTaskTitleToEdit,
      };
  default: 
      return state;
  }
};
