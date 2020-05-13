// npm imports

// local imports

// state
const initialState = {
  buttons: [
    {
      id: 1,
      cssClass: 'task__content__button__incomplete',
      variant: 'success',
      icon:'fa fa-step-backward',
      onClickAction: 'undoTask',
    },
    {
      id: 2,
      cssClass: 'task__content__button__desarchive',
      variant: 'success',
      icon:'fa fa-undo',
      onClickAction: '',
    },
    {
      id: 3,
      cssClass: 'task__content__button__validate',
      variant: 'success',
      icon:'fa fa-check-square-o',
      onClickAction: 'validateTask',
    },
    {
      id: 4,
      cssClass: 'task__content__button__modify',
      variant: 'warning',
      icon:'fa fa-pencil-square-o',
      onClickAction: '',
    },
    {
      id: 5,
      cssClass: 'task__content__button__archive',
      variant: 'danger',
      icon:'fa fa-archive',
      onClickAction: 'archiveTask',
    },
    {
      id: 6,
      cssClass: 'task__content__button__delete',
      variant: 'danger',
      icon:'fa fa-trash',
      onClickAction: '',
    },
  ]
};

// reducer
export default (state = initialState, action = {}) => {
  return state;
};
