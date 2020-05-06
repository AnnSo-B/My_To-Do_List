const app = {
  init: function() {
    console.log('init');

    // get the list of the tasks
    const taskList = document.querySelectorAll('.task--todo, .task--complete, .task--done, .task--edit, .task--archive');

    // for each task we'll add a listener on the validate button
    for (let taskIndex = 0; taskIndex < taskList.length ; taskIndex++) {
      let task = taskList[taskIndex];
      // we select the validate button 
      let validateButton = task.querySelector('.task__content__button__validate');
      // we had the handler
      validateButton.addEventListener('click', app.handleValidateButton)
    }
  },

  /**
   * handler on validate button
   */
  handleValidateButton: function() {
    // find the task associated with the validate button
    let currentTask = event.currentTarget.closest('.task');
    // change its classes so it becomes a completed task
    currentTask.classList.remove('task--todo');
    currentTask.classList.add('task--done');

    // find the progress bar to fill it
    let currentTaskProgressBar = currentTask.querySelector('.progress-bar');
    // change its completion percentage
    currentTaskProgressBar.style.width = '100%';
  }
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    