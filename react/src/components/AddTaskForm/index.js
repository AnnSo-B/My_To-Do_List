// npm imports
import React from 'react';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';
import TaskTitleInput from '../../containers/TaskTitleInput';

// component
const AddTaskForm = () => (
  <section className="task task--add">
    <form className="task--add__form">
      <div className="task__content">
        <div className="task__content__title">
          <TaskTitleInput />
        </div>
      </div>
      <div id="task--add__category-select" className="task-form-group my-3 selectCategoryMenu">
        <CategoryMenu />
      </div>
      <button type="submit" className="btn btn-primary task--add__button">
        <span>+</span> Ajouter
      </button>
    </form>
  </section>
);

// Props validation

// export
export default AddTaskForm;
