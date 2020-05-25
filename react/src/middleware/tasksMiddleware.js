// npm import
import axios from 'axios';

// local import
import {
  FETCH_TASK_LIST,
  fetchTaskList,
  fetchTaskListSuccess,
  fetchTaskListError,
  TASK_UPDATE,
  taskUpdateError,
  TASK_DELETION,
  taskDeletionError,
  NEW_TASK_SUBMISSION,
  newTaskSubmissionError,
} from '../actions';
import { apiURL } from '../app.config';

// middleware
export default (store) => (next) => (action) => {
  let id = null;

  switch (action.type) {
    case FETCH_TASK_LIST: 
console.log('FETCH_TASK_LIST');
console.log('action.payload', action.payload);

      // by default, we fetch all the tasks
      let requestGoesTo = `${apiURL}tasks`;

      // status takes the value from the state
      let status = store.getState().taskList.statusFilter;
console.log('store.getState().taskList.statusFilter', store.getState().taskList.statusFilter);
      // or takes the value of payload.statusFilter if it exists
      if (action.payload !== '' && action.payload.statusFilter !== '') {
        status = action.payload.statusFilter; 
      }
console.log('status', status);

      // category takes the value of payload.categoryFilter if it exists, or it takes the value in the state
      let category = store.getState().taskList.categoryFilter;
console.log('store.getState().taskList.categoryFilter', store.getState().taskList.categoryFilter);
      if (action.payload !== '' && action.payload.categoryFilter !== 0) {
        category = action.payload.categoryFilter;
      }
console.log('category', category);

      // if we have a status different from 0, we only fetch the tasks according to their status
      if (status !== 0) {
        requestGoesTo = `${apiURL}tasks/status/${status}`;
      }
      // if we have a category different from 0, we only fetch the tasks according to their status
      else if (category !== 0) {
        requestGoesTo = `${apiURL}tasks/category/${category}`;
      }

console.log('requestGoesTo', requestGoesTo);

      axios.get(requestGoesTo)
      .then((response) => {
         // send data to the store via fetchTaskListSuccess action creator and the status of the displayed tasks
        store.dispatch(fetchTaskListSuccess({taskList: response.data, status, category}));
      })
      .catch(() => {
        // send an error to display in case of failure
        store.dispatch(fetchTaskListError('Une erreur est survenue au chargement de la liste des tâches.'));
      });
      break;
    case TASK_UPDATE:
      id = parseInt(store.getState().taskList.task.id);
      if ( id !== null ) {
        axios.put(
          `${apiURL}tasks/${id}`,
          {
            title: store.getState().taskList.task.title,
            completion: store.getState().taskList.task.completion,
            status: store.getState().taskList.task.status,
          }
        )
        .then(() => {
          // and send a new task List
          store.dispatch(fetchTaskList());
        })
        .catch(() => {
            // send an error message if task can't be updated
            store.dispatch(taskUpdateError('Une erreur est survenue lors de la mise à jour de la tâche.'));
        });
      }
      break;
    case TASK_DELETION: 
      id = parseInt(action.payload.taskId);
      axios.delete(
        `${apiURL}tasks/${id}`,
      )
      .then(() => {
        // and send a new task List in case of success
        store.dispatch(fetchTaskList());
      })
      .catch(() => {
        // send an error message if task can't be deleted
        store.dispatch(taskDeletionError('Une erreur est survenue lors de la tentative de suppression de la tâche.'))
      });
      break;   
    case NEW_TASK_SUBMISSION: 
      axios.post(
        `${apiURL}tasks`,
        {
          title: store.getState().taskList.task.title,
          categoryId: store.getState().taskList.task.categoryId,
        }
      )
      .then(() => {
        // in case of success, we want to display the new task list once the new task is added
        store.dispatch(fetchTaskList());
      })
      .catch(() => {
        // send an error message if task can't be added
        store.dispatch(newTaskSubmissionError('Une erreur est survenue lors de la tentative d\'ajout de la tâche.'))
      });
      break;
    default: 
      next(action);
  }

};
