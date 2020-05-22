// npm imports
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({ value = '', onInputChange, onInputBlur }) => {
  const focusOnInput = useRef(null);
  useEffect(() => {
    focusOnInput.current.focus();
  })

  return (
    <input
      ref={focusOnInput}
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
  )
};

// Props validation
TaskTitleInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func,
};

// export
export default TaskTitleInput;
