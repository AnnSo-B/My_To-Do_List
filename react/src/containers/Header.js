// npm imports
import { connect } from 'react-redux';

// local imports
import Header from '../components/Header';
import {
  resetNewTaskCategory,
  fetchTaskList,
  fetchCategoryWithTasks,
  resetDeletableCategory,
  deleteCategory,
} from '../actions';

// state
const mapStateToProps = (state) => ({
  statusFilter: state.taskList.statusFilter,
  categoryFilter : state.taskList.categoryFilter,
  deletableCategory: state.categoryList.deletableCategory,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: (filter) => {
    // we reset the add task form category in case the user was trying to hide a new task when he clicked to the header
    dispatch(resetNewTaskCategory());
    // we want to get the list of category
    dispatch(fetchTaskList(filter));
  },
  fetchCategoryWithTasks: (categoryId) => {
    dispatch(fetchCategoryWithTasks(categoryId));
  },
  resetDeletableCategory: () => {
    dispatch(resetDeletableCategory());
  },
  deleteCategory: (categoryId) => {
    dispatch(deleteCategory(categoryId));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Header);
