// action types
export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';

// action creators
export const fetchTaskList = () => ({
  type: FETCH_TASK_LIST,
});

export const fetchTaskListSuccess = (payload) => ({
  type: FETCH_TASK_LIST_SUCCESS,
  payload,
});
