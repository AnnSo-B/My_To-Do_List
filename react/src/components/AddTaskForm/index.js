// npm imports
import React from 'react';

// local imports
import './style.css';
import CategoryMenu from '../CategoryMenu';
import TaskTitleInput from '../TaskTitleInput';

// component
const AddTaskForm = () => (
  <section className="task task--add">
    <form class="task--add__form">
      <div class="task__content">
        <div class="task__content__title">
          <TaskTitleInput />
        </div>
      </div>
      <div id="task--add__category-select" class="task-form-group my-3 selectCategoryMenu">
        <CategoryMenu />
      </div>
      <button type="submit" class="btn btn-primary task--add__button">
        <span>+</span> Ajouter
      </button>
    </form>
  </section>
);

// Props validation

// export
export default AddTaskForm;
