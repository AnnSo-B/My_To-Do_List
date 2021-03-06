// npm imports
import { connect } from 'react-redux';

// local imports
import AddTaskForm from '../components/AddTaskForm';
import {
  changeNewTaskCategory,
  displayNewCategoryInput,
  submitNewCategory,
  submitNewTask,
  resetNewTaskCategory,
  resetDeletableCategory,
} from '../actions';

// state
const mapStateToProps = (state) => ({
  // if the task ID in the state is null, it means that the user is creating a new task, so we want to display the category selected for the new task
  addTaskCategoryId: state.taskList.task.id === null ? state.categoryList.newTaskCategory : 0,
  // if task id in the state is null, it means that the user is creating a new task, so we want to display its title in the input
  editedTaskInput: state.taskList.task.id === null ? true : false,
  newTaskTitle: state.taskList.task.title,
  newCategory: state.categoryList.newCategory,
  newCategoryName: state.categoryList.category.name,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  changeNewTaskCategory: (categoryId) => {
    dispatch(changeNewTaskCategory(categoryId));
  },
  displayNewCategoryInput: (categoryId) => {
    dispatch(displayNewCategoryInput(categoryId));
  },
  submitNewCategory: () => {
    dispatch(submitNewCategory());
  },
  onNewTaskSubmit: () => {
    dispatch(submitNewTask());
    dispatch(resetNewTaskCategory());
    dispatch(resetDeletableCategory());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
