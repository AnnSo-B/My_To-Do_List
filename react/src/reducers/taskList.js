// npm imports

// local imports
import {
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_ERROR,
  TASK_UPDATE_ERROR,
  TASK_DELETION_ERROR,
  TASK_EDIT,
  CHANGE_TASK_TITLE,
  CHANGE_NEW_TASK_CATEGORY,
  NEW_TASK_SUBMISSION_ERROR,
} from '../actions';

// state
const initialState = {
  taskList: [],
  fetchError: '',
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
  let updatedTaskList = [];

  switch (action.type) {
    case FETCH_TASK_LIST_SUCCESS: 
console.log('FETCH_TASK_LIST_SUCCESS')
console.log('action.payload.status', action.payload.status)
console.log('action.payload.category', action.payload.category)
      return {
        ...state,
        taskList: action.payload.taskList,
        fetchError: '',
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
        fetchError: action.payload,
      };
    case TASK_UPDATE_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
    case TASK_DELETION_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
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
        fetchError: '',
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
    case CHANGE_NEW_TASK_CATEGORY: 
      return {
        ...state,
        task: {
          ...state.task,
          categoryId: action.payload,
        },
      };
    case NEW_TASK_SUBMISSION_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
  default: 
      return state;
  };
};
