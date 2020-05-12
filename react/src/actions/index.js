//* action types
// Tasks
export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const FETCH_TASK_LIST_ERROR = 'FETCH_TASK_LIST_ERROR';
// Task's buttons
export const FETCH_TASK_UPDATE = 'FETCH_TASK_UPDATE';
// Categories
export const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST';
export const FETCH_CATEGORY_LIST_SUCCESS = 'FETCH_CATEGORY_LIST_SUCCESS';
export const FETCH_CATEGORY_LIST_ERROR = 'FETCH_CATEGORY_LIST_ERROR';


//* action creators
// Tasks
export const fetchTaskList = () => ({
  type: FETCH_TASK_LIST,
});

export const fetchTaskListSuccess = (payload) => ({
  type: FETCH_TASK_LIST_SUCCESS,
  payload,
});

export const fetchTaskListError = (payload) => ({
  type: FETCH_TASK_LIST_ERROR,
  payload,
});

// Task's buttons
export const fetchTaskUpdate = (payload) => ({
  type: FETCH_TASK_UPDATE,
  payload,
});

// Categories
export const fetchCategoryList = () => ({
  type: FETCH_CATEGORY_LIST,
});

export const fetchCategoryListSuccess = (payload) => ({
  type: FETCH_CATEGORY_LIST_SUCCESS,
  payload,
});

export const fetchCategoryListError = (payload) => ({
  type: FETCH_CATEGORY_LIST_ERROR,
  payload,
});
