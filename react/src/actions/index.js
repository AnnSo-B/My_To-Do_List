//* action types
// Tasks
export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const FETCH_TASK_LIST_ERROR = 'FETCH_TASK_LIST_ERROR';
// Task's buttons
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS';
export const TASK_UPDATE_ERROR = 'TASK_UPDATE_ERROR';
export const TASK_DELETION = 'TASK_DELETION';
export const TASK_DELETION_SUCCESS = 'TASK_DELETION_SUCCESS';
export const TASK_DELETION_ERROR = 'TASK_DELETION_ERROR';
export const TASK_EDIT = 'TASK_EDIT';
// Task input 
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
// Add task
export const CHANGE_NEW_TASK_CATEGORY = 'CHANGE_NEW_TASK_CATEGORY';
export const NEW_TASK_SUBMISSION = 'NEW_TASK_SUBMISSION';
export const NEW_TASK_SUBMISSION_SUCCESS = 'NEW_TASK_SUBMISSION_SUCCESS';
export const NEW_TASK_SUBMISSION_ERROR = 'NEW_TASK_SUBMISSION_ERROR';
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
export const taskUpdate = (payload) => ({
  type: TASK_UPDATE,
  payload,
});

export const taskUpdateSuccess = (payload) => ({
  type: TASK_UPDATE_SUCCESS,
  payload,
});

export const taskUpdateError = (payload) => ({
  type: TASK_UPDATE_ERROR,
  payload,
});

export const taskDeletion = (payload) => ({
  type: TASK_DELETION,
  payload,
});

export const taskDeletionSuccess = (payload) => ({
  type: TASK_DELETION_SUCCESS,
  payload,
});

export const taskDeletionError = (payload) => ({
  type: TASK_DELETION_ERROR,
  payload,
});

export const taskEdit = (payload) => ({
  type: TASK_EDIT,
  payload,
});

// Task input
export const changeTaskTitle = (payload) => ({
  type: CHANGE_TASK_TITLE,
  payload,
});

// Add task category
export const changeNewTaskCategory = (payload) => ({
  type: CHANGE_NEW_TASK_CATEGORY,
  payload,
});

export const submitNewTask = () => ({
  type: NEW_TASK_SUBMISSION,
});

export const newTaskSubmissionSuccess = (payload) => ({
  type: NEW_TASK_SUBMISSION_SUCCESS,
  payload,
});

export const newTaskSubmissionError = (payload) => ({
  type: NEW_TASK_SUBMISSION_ERROR,
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
