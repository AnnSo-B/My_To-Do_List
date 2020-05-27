// npm imports

// local imports
import {
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_ERROR,
  TASK_UPDATE_ERROR,
  TASK_DELETION_ERROR,
  TASK_EDIT,
  CHANGE_TASK_TITLE,
  NEW_TASK_SUBMISSION_ERROR,
  RESET_NEW_TASK_CATEGORY,
  RESET_CATEGORY_FILTER,
} from '../actions';

// state
const initialState = {
  taskList: [],
  emptyList: true,
  fetchMessage: '',
  task: {
    id: null,
    title: '',
    completion: 0,
    categoryId: 0,
  },
  statusFilter: 0,
  categoryFilter: 0,
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TASK_LIST_SUCCESS: 
      return {
        ...state,
        emptyList: action.payload.message !== '' ? true : false,
        taskList: action.payload.taskList,
        fetchMessage: action.payload.message,
        task: {
          id: null,
          title: '',
          completion: 0,
          categoryId: 0,
        },
        statusFilter: action.payload.status,
        categoryFilter: action.payload.category,
      };
    case FETCH_TASK_LIST_ERROR: 
      return {
        ...state,
        emptyList: action.payload !== '' ? true : false,
        fetchMessage: action.payload,
      };
    case TASK_UPDATE_ERROR: 
      return {
        ...state,
        fetchMessage: action.payload,
      };
    case TASK_DELETION_ERROR: 
      return {
        ...state,
        fetchMessage: action.payload,
      };
    case TASK_EDIT:
      // we want to change the status of the task that we want to edit in order to display the input
      const taskId = parseInt(action.payload.taskId);
      updatedTaskList = state.taskList.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 4,
          }
        }
        return task;
      });
      // we complete the task proprety from the state with its data
      const taskToEdit = state.taskList.find(task => task.id === taskId);
      return {
        ...state,
        fetchMessage: '',
        taskList: [
          ...updatedTaskList,
        ],
        task: {
          id: taskToEdit.id,
          title: taskToEdit.title,
          completion: taskToEdit.completion,
          categoryId: taskToEdit.categoryId,
        },
      };
    case CHANGE_TASK_TITLE: 
      return {
        ...state,
        task: {
          ...state.task,
          title: action.payload,
        },
      };
    case NEW_TASK_SUBMISSION_ERROR: 
      return {
        ...state,
        fetchMessage: action.payload,
      };
    case RESET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: 0,
      };
  default: 
      return state;
  };
};
