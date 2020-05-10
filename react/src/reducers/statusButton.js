// npm imports

// local imports
import { TEST_MIDDLEWARE } from '../actions';

// state
const initialState = {
  buttons: [
    {
      id: 1,
      cssClass: 'task__content__button__incomplete',
      variant: 'success',
      icon:'fa fa-step-backward',
    },
    {
      id: 2,
      cssClass: 'task__content__button__desarchive',
      variant: 'success',
      icon:'fa fa-undo',
    },
    {
      id: 3,
      cssClass: 'task__content__button__validate',
      variant: 'success',
      icon:'fa fa-step-backward',
    },
    {
      id: 4,
      cssClass: 'task__content__button__modify',
      variant: 'warning',
      icon:'fa fa-pencil-square-o',
    },
    {
      id: 5,
      cssClass: 'task__content__button__archive',
      variant: 'danger',
      icon:'fa fa-archive',
    },
    {
      id: 6,
      cssClass: 'task__content__button__delete',
      variant: 'danger',
      icon:'fa fa-trash',
    },
  ]
};

// reducer
export default (state = initialState, action = {}) => {
  return state;
};
