// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';
import TaskTitleInput from '../../containers/TaskTitleInput';

// component
const AddTaskForm = ({
  addTaskCategoryId,
  editedTask,
  newTaskTitle,
  changeNewTaskCategory,
  onNewTaskSubmit
}) => (
  <section className="task task--add">
    <form
      className="task--add__form"
      onSubmit={(event) => {
        event.preventDefault();
        onNewTaskSubmit();
      }}
    >
      <div className="task__content">
        <div className="task__content__title">
          <TaskTitleInput value={editedTask ? newTaskTitle : ''} />
        </div>
      </div>
      <div id="task--add__category-select" className="task-form-group my-3 selectCategoryMenu">
        <CategoryMenu
          selectedCategory={addTaskCategoryId}
          onCategoryChange={(event) => changeNewTaskCategory(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary task--add__button">
        <span>+</span> Ajouter
      </button>
    </form>
  </section>
);

// Props validation
AddTaskForm.propTypes = {
  addTaskCategoryId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  editedTask: PropTypes.bool.isRequired,
  newTaskTitle: PropTypes.string.isRequired,
  changeNewTaskCategory: PropTypes.func.isRequired,
  onNewTaskSubmit: PropTypes.func.isRequired,
};

// export
export default AddTaskForm;
