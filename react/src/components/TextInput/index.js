// npm imports
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// local imports

// component
const TextInput = ({
  // come from the parent which contains it
  cssClass,
  name,
  placeHolder,
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
      className={cssClass}
      type="type"
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={
        // every time the user is typing, the change is saved and displayed
        (event) => onInputChange(event.target.name, event.target.value)
      }
      onBlur={onInputBlur}
    />
  );
};  

// Props validation
TextInput.propTypes = {
  // come from the parent which contains it
  cssClass: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  focusedInput: PropTypes.bool.isRequired,
  onInputBlur: PropTypes.func,
  // come from container
  onInputChange: PropTypes.func.isRequired,
};

// export
export default TextInput ;
