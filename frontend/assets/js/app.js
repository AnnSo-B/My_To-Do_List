const app = {
  init: function() {
    console.log('init');

    // get the list of the tasks
    const taskList = document.querySelectorAll('.task--todo, .task--complete, .task--done, .task--edit, .task--archive');
    console.log(taskList);

    // for each task we'll add a listener on the validate button
    for (let taskIndex = 0; taskIndex < taskList.length ; taskIndex++) {
      let task = taskList[taskIndex];
      console.log(task);
      // we select the validate button 
      let validateButton = task.querySelector('.task__content__button__validate');
      console.log(validateButton);
      // we had the handler
      validateButton.addEventListener('click', app.handleValidateButton)
    }
  },

  /**
   * handler on validate button
   */
  handleValidateButton: function() {
    console.log('validate button on click')
  }
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    