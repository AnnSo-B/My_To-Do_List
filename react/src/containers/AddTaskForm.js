// npm imports
import { connect } from 'react-redux';

// local imports
import AddTaskForm from '../components/AddTaskForm';
import { changeNewTaskCategory, submitNewTask } from '../actions';

// state
const mapStateToProps = (state) => ({
  // if the task ID in the state is null, it means that the user is creating a new task, so we want to display the category selected for the new task
  addTaskCategoryId: state.taskList.task.id === null ? state.taskList.task.categoryId : 0,
  // if task id in the state is null, it means that the user is creating a new task, so we want to display its title in the input
  editedTaskInput: state.taskList.task.id === null ? true : false,
  newTaskTitle: state.taskList.task.title,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  changeNewTaskCategory: (categoryId) => {
    dispatch(changeNewTaskCategory(categoryId));
  },
  onNewTaskSubmit: () => {
    dispatch(submitNewTask());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
