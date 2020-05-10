// action types
export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const FETCH_TASK_LIST_ERROR = 'FETCH_TASK_LIST_ERROR';

// action creators
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
