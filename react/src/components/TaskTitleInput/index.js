// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({ value = '', onInputChange }) => (
  <input
    className="task__content__input"
    type="text"
    name="title"
    placeholder="Nom de la tâche"
    value={value}
    onChange={
      (event) => onInputChange(event.target.value)
    }
  />
);

// Props validation
TaskTitleInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};

// export
export default TaskTitleInput;
