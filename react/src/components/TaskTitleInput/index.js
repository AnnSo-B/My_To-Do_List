// npm imports
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({ value = '', focusedInput, onInputChange, onInputBlur }) => {
  const inputRef = useRef(null);
  useEffect(() =>  {
    if (focusedInput) {
      inputRef.current.focus();
    }
  })


  return (
    <input
      ref={inputRef}
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
};  

// Props validation
TaskTitleInput.propTypes = {
  value: PropTypes.string,
  focusedInput: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func,
};

// export
export default TaskTitleInput;
