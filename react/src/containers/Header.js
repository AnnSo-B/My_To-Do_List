// npm imports
import { connect } from 'react-redux';

// local imports
import Header from '../components/Header';
import { fetchTaskList } from '../actions';

// state
const mapStateToProps = (state) => ({
  statusFilter: state.taskList.statusFilter,
  selectedCategory: state.taskList.categoryFilter,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: (filter) => {
    dispatch(fetchTaskList(filter));
  }
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Header);
