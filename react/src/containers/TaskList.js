// npm imports
import { connect } from 'react-redux';

// local imports
import TaskList from '../components/TaskList';

// state
const mapStateToProps = (state) => ({
  taskList: state.taskList.taskList,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
