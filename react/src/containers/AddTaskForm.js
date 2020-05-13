// npm imports
import { connect } from 'react-redux';

// local imports
import AddTaskForm from '../components/AddTaskForm';
import { changeNewTaskCategory } from '../actions';

// state
const mapStateToProps = (state) => ({
  addTaskCategoryId: state.taskList.task.categoryId,
  newTaskTitle: state.taskList.task.title,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  changeNewTaskCategory: (categoryId) => {
    dispatch(changeNewTaskCategory(categoryId));
  },
  onNewTaskSubmit: () => {
    console.log('onNewTaskSubmit');
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
