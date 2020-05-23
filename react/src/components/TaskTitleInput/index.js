// npm imports
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TaskTitleInput = ({
  // come from the parent which contains it
  value = '',
  focusedInput,
  onInputBlur,
  onInputChange,
}) => {
  // we want to put the focus on the entry the user is modifying
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
        // every time the user is typing, the change is saved and displayed
        (event) => onInputChange(event.target.value)
      }
      onBlur={onInputBlur}
    />
  );
};  

// Props validation
TaskTitleInput.propTypes = {
  // come from the parent which contains it
  value: PropTypes.string,
  focusedInput: PropTypes.bool.isRequired,
  onInputBlur: PropTypes.func,
  // come from container
  onInputChange: PropTypes.func.isRequired,
};

// export
export default TaskTitleInput;
