// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';
import TextInput from '../../containers/TextInput';

// component
const AddTaskForm = ({
  addTaskCategoryId,
  editedTaskInput,
  newTaskTitle,
  changeNewTaskCategory,
  displayNewCategoryInput,
  onNewTaskSubmit,
}) => (
  <section className="task task--add">
    <form
      className="task--add__form"
      // when the form is submitted we want to prevent the page from refreshing and to add the new task to the DB
      onSubmit={(event) => {
        event.preventDefault();
        onNewTaskSubmit();
      }}
    >
      <div className="task__content">
        <div className="task__content__title">
          <TextInput
            cssClass="task__content__input"
            name="title"
            // if the user is filling in the add task form, we want it to be focused on and we want the new task title to be the value of the entry
            focusedInput={editedTaskInput ? true : false}
            value={editedTaskInput ? newTaskTitle : ''}
          />
        </div>
      </div>
      <div id="task--add__category-select" className="task-form-group my-3 selectCategoryMenu">
        {
          addTaskCategoryId !== 1
          ? (
            <CategoryMenu
              // by default, we want the selected category to be "Choisir une catégorie" and then change it by the user's selection when he changes it
              selectedCategory={addTaskCategoryId}
              onCategoryChange={
                (event) => {
                  const categoryId = parseInt(event.target.value)
                  categoryId !== 1
                    ? changeNewTaskCategory(categoryId)
                    : displayNewCategoryInput(categoryId);
                }
              }
            />
          ) : (
            <TextInput
              cssClass="new__category__input"
              name="name"
              focusedInput
              value="test"
            />
          )
        }
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
  editedTaskInput: PropTypes.bool.isRequired,
  newTaskTitle: PropTypes.string.isRequired,
  changeNewTaskCategory: PropTypes.func.isRequired,
  displayNewCategoryInput: PropTypes.func.isRequired,
  onNewTaskSubmit: PropTypes.func.isRequired,
};

// export
export default AddTaskForm;
