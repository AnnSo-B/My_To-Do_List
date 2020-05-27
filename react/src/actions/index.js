//* action types
// Tasks
export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const API_ERROR_MESSAGE = 'API_ERROR_MESSAGE';
// Task's buttons
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_DELETION = 'TASK_DELETION';
export const TASK_EDIT = 'TASK_EDIT';
// Task input 
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
// Add task
export const CHANGE_NEW_TASK_CATEGORY = 'CHANGE_NEW_TASK_CATEGORY';
export const NEW_TASK_SUBMISSION = 'NEW_TASK_SUBMISSION';
// Categories
export const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST';
export const FETCH_CATEGORY_LIST_SUCCESS = 'FETCH_CATEGORY_LIST_SUCCESS';
export const FETCH_CATEGORY_API_MESSAGE = 'FETCH_CATEGORY_API_MESSAGE';
export const DISPLAY_NEW_CATEGORY_INPUT = 'DISPLAY_NEW_CATEGORY_INPUT';
export const CHANGE_CATEGORY_NAME = 'CHANGE_CATEGORY_NAME';
export const SUBMIT_NEW_CATEGORY = 'SUBMIT_NEW_CATEGORY';
export const RESET_NEW_TASK_CATEGORY = 'RESET_NEW_TASK_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const RESET_CATEGORY_FILTER = 'RESET_CATEGORY_FILTER';


//* action creators
// Tasks
export const fetchTaskList = (payload = '') => ({
  type: FETCH_TASK_LIST,
  payload,
});

export const fetchTaskListSuccess = (payload) => ({
  type: FETCH_TASK_LIST_SUCCESS,
  payload,
});

export const apiErrorMessage = (payload) => ({
  type: API_ERROR_MESSAGE,
  payload,
});

// Task's buttons
export const taskUpdate = (payload) => ({
  type: TASK_UPDATE,
  payload,
});

export const taskDeletion = (payload) => ({
  type: TASK_DELETION,
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

// Categories
export const fetchCategoryList = (payload = '') => ({
  type: FETCH_CATEGORY_LIST,
  payload,
});

export const fetchCategoryListSuccess = (payload) => ({
  type: FETCH_CATEGORY_LIST_SUCCESS,
  payload,
});

export const fetchCategoryApiMessage = (payload) => ({
  type: FETCH_CATEGORY_API_MESSAGE,
  payload,
});

export const displayNewCategoryInput = (payload) => ({
  type: DISPLAY_NEW_CATEGORY_INPUT,
  payload,
});

export const changeCategoryName = (payload) => ({
  type: CHANGE_CATEGORY_NAME,
  payload,
});

export const submitNewCategory = () => ({
  type: SUBMIT_NEW_CATEGORY,
});

export const resetNewTaskCategory = () => ({
  type: RESET_NEW_TASK_CATEGORY,
});

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});

export const resetCategoryFilter = () => ({
  type: RESET_CATEGORY_FILTER,
});
