const errorMessages = {
  init: function() {
    //* initialise error message container
    errorMessages.errorMessageContainer = document.querySelector('#error-message-container');
  }, 

   /**
    * Method to display Error Messages
    *
    * @param {string} message
    */
  displayErrorMessage: function(message) {
    //* create and place the message
    const errorMessageElement = document.createElement('div');
    // give its css classes
    errorMessageElement.classList.add('alert', 'alert-danger', 'my-3');
    // git its content
    errorMessageElement.textContent = message;
    // insert into the DOM
    errorMessages.errorMessageContainer.appendChild(errorMessageElement);

    // delete the message after 10 secondes
    setTimeout(errorMessages.deleteErrorMessage, 10000)
  },

  /**
   * Method to delete error message
   */
  deleteErrorMessage: function() {
    errorMessages.errorMessageContainer.innerHTML = '';
  },
};
