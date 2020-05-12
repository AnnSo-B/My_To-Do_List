// npm imports
import { connect } from 'react-redux';

// local imports
import App from '../components/App';
import { fetchTaskList, fetchCategoryList } from '../actions';

// state
const mapStateToProps = (state) => ({
  error: state.taskList.fetchError,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: () => {
    dispatch(fetchTaskList());
  },
  fetchCategoryList: () => {
    dispatch(fetchCategoryList());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(App);
