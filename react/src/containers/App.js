// npm imports
import { connect } from 'react-redux';

// local imports
import App from '../components/App';
import { fetchTaskList } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: () => {
    dispatch(fetchTaskList());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(App);
