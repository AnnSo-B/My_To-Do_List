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
  CHANGE_TASK_TITLE,
  CHANGE_NEW_TASK_CATEGORY,
  NEW_TASK_SUBMISSION_SUCCESS,
  NEW_TASK_SUBMISSION_ERROR,
} from '../actions';

// state
const initialState = {
  taskList: [],
  fetchError: '',
  task: {
    id: null,
    title: '',
    categoryId: 0,
  },
  statusFilter: 0,
};

// reducer
export default (state = initialState, action = {}) => {
  let updatedTaskList = [];

  switch (action.type) {
    case FETCH_TASK_LIST_SUCCESS: 
      return {
        ...state,
        taskList: action.payload.taskList,
        fetchError: '',
        statusFilter: action.payload.status,
      };
    case FETCH_TASK_LIST_ERROR: 
      return {
        ...state,
        fetchError: action.payload,
      };
    case TASK_UPDATE_SUCCESS: 
      // updatedTaskList = state.taskList.map((task) => {
      //   if (task.id === action.payload.id) {
      //     return action.payload
      //   }
      //   return task;
      // });
      return {
        ...state,
        fetchError: '',
        // taskList: [
        //   ...updatedTaskList,
        // ],
        task: {
          id: null,
          title: '',
          categoryId: 0,
        },
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
      const taskTitleToEdit = state.taskList.find(task => task.id === taskId).title;
      return {
        ...state,
        fetchError: '',
        taskList: [
          ...updatedTaskList,
        ],
        task: {
          id: taskId,
          title: taskTitleToEdit,
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
    case NEW_TASK_SUBMISSION_SUCCESS: 
      return {
        ...state,
        taskList: [
          ...state.taskList,
          action.payload,
        ],
        fetchError: '',
        task: {
          id: null,
          title: '',
          categoryId: 0,
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
