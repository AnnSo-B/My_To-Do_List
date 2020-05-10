// npm imports
import { connect } from 'react-redux';

// local imports
import ErrorMessage from '../components/ErrorMessage';

// state
const mapStateToProps = (state) => ({
  error: state.taskList.fetchError,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
