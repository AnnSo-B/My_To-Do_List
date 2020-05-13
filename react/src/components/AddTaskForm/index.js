// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';
import TaskTitleInput from '../../containers/TaskTitleInput';

// component
const AddTaskForm = ({ addTaskCategoryId, newTaskTitle }) => (
  <section className="task task--add">
    <form className="task--add__form">
      <div className="task__content">
        <div className="task__content__title">
          <TaskTitleInput value={newTaskTitle} />
        </div>
      </div>
      <div id="task--add__category-select" className="task-form-group my-3 selectCategoryMenu">
        <CategoryMenu
          selectedCategory={addTaskCategoryId}
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
  addTaskCategoryId: PropTypes.number.isRequired,
  newTaskTitle: PropTypes.string.isRequired,
};

// export
export default AddTaskForm;
