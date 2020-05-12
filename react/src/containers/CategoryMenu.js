// npm imports
import { connect } from 'react-redux';

// local imports
import CategoryMenu from '../components/CategoryMenu';

// state
const mapStateToProps = (state) => ({
  categoryList: state.categoryList.categoryList,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
