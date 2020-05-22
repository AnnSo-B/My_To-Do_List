// npm imports
import { connect } from 'react-redux';

// local imports
import AddTaskForm from '../components/AddTaskForm';
import { changeNewTaskCategory, submitNewTask } from '../actions';

// state
const mapStateToProps = (state) => ({
  addTaskCategoryId: state.taskList.task.id === null ? state.taskList.task.categoryId : 0,
  editedTask: state.taskList.task.id === null ? true : false,
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
