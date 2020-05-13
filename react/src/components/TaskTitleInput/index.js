// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({ value = '' }) => (
  <input
    className="task__content__input"
    type="text"
    name="title"
    placeholder="Nom de la tâche"
    value={value}
  />
);

// Props validation
TaskTitleInput.propTypes = {
  value: PropTypes.string,
};

// export
export default TaskTitleInput;
