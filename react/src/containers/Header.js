// npm imports
import { connect } from 'react-redux';

// local imports
import Header from '../components/Header';
import { fetchTaskList, deleteCategory } from '../actions';

// state
const mapStateToProps = (state) => ({
  statusFilter: state.taskList.statusFilter,
  categoryFilter : state.taskList.categoryFilter,
  emptyTaksList: state.taskList.emptyList,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: (filter) => {
    dispatch(fetchTaskList(filter));
  },
  deleteCategory: (categoryId) => {
    dispatch(deleteCategory(categoryId));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Header);
