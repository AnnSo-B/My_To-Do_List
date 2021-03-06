// npm import
import axios from 'axios';

// local import
import {
  FETCH_CATEGORY_LIST,
  fetchCategoryList,
  fetchCategoryListSuccess,
  fetchCategoryApiMessage,
  FETCH_CATEGORY_WITH_TASKS,
  fetchCategoryWithTasksSuccess,
  SUBMIT_NEW_CATEGORY,
  DELETE_CATEGORY,
  resetCategoryFilter,
  fetchTaskList,
} from '../actions';
import { apiURL } from '../app.config';

// middleware
export default (store) => (next) => (action) => {
  let categoryId = '';

  switch (action.type) {
    case FETCH_CATEGORY_LIST: 
    categoryId = action.payload.newCategoryId ? action.payload.newCategoryId : 0;
      axios.get(`${apiURL}/categories`)
        .then((response) => {
          // send data to the store via fetchCategoryListSuccess action creator
          store.dispatch(fetchCategoryListSuccess({
            categoryList: response.data,
            newCategoryId: categoryId,
          }));
        })
        .catch(() => {
          // send an error to display in case of failure
          store.dispatch(fetchCategoryApiMessage('Une erreur est survenue au chargement de la liste des catégories.'));
        });
      break;
    case FETCH_CATEGORY_WITH_TASKS: 
      categoryId = action.payload.categoryFilter;
      axios.get(`${apiURL}/categories/${categoryId}/tasks`)
        .then((response) => {
          // we want to know how many tasks are associated to this category
          const associatedTasksNumber = response.data[0].tasks.length;
          store.dispatch(fetchCategoryWithTasksSuccess(associatedTasksNumber));
        })
        .catch(() => {
          // send an error to display in case of failure
          store.dispatch(fetchCategoryApiMessage('Une erreur est survenue au chargement de la liste des catégories associées à leurs tâches.'));
        });
      break;
    case SUBMIT_NEW_CATEGORY:
      axios.post(
        `${apiURL}categories`,
          {
            name: store.getState().categoryList.category.name,
          }
        )
        .then((response) => {
          store.dispatch(fetchCategoryList({newCategoryId: parseInt(response.data.id)}));
        })
        .catch(() => {
          store.dispatch(fetchCategoryApiMessage('Une erreur est survenue lors de la création de cette catégorie. Merci de réessayer ultérieurement.'));
        })
      break;
    case DELETE_CATEGORY:
      const categoryToDelete = action.payload;

      axios.delete(
        `${apiURL}categories/${categoryToDelete}`,
      )
      .then(() => {
        store.dispatch(resetCategoryFilter());
      })
      .then(() => {
        store.dispatch(fetchCategoryList());
      })
      .then(() => {
        store.dispatch(fetchTaskList());
      })
      .catch(() => {
        store.dispatch(fetchCategoryApiMessage('Une erreur est survenue lors de la suppression de cette catégorie. Merci de réessayer ultérieurement.'));
      })
      break;
    default: 
      next(action);
  }

};
