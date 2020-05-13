// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({ value = '', onInputChange, onInputBlur }) => (
  <input
    className="task__content__input"
    type="text"
    name="title"
    placeholder="Nom de la tâche"
    value={value}
    onChange={
      (event) => onInputChange(event.target.value)
    }
    onBlur={onInputBlur}
  />
);

// Props validation
TaskTitleInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
};

// export
export default TaskTitleInput;
