// npm imports
import { connect } from 'react-redux';

// local imports
import ErrorMessage from '../components/ErrorMessage';

// state
const mapStateToProps = (state) => ({
  taskListError: state.taskList.fetchError,
  categoryListError: state.categoryList.fetchError,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
