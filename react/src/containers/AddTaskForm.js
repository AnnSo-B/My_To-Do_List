// npm imports
import { connect } from 'react-redux';

// local imports
import AddTaskForm from '../components/AddTaskForm';

// state
const mapStateToProps = (state) => ({
  addTaskCategoryId: state.taskList.task.categoryId,
  newTaskTitle: state.taskList.task.title,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
