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
      // we add the listener
      validateButton.addEventListener('click', app.handleValidateButton)
    }

    // get the form to add a task
    const addTaskForm = document.querySelector('.task--add');
    // we add the listener
    addTaskForm.addEventListener('submit', app.handleAddTaskFormSubmit);
  },

  /**
   * handler on validate button : 
   * change current class and change progression bar
   */
  handleValidateButton: function() {
    // find the task associated with the validate button
    const currentTask = event.currentTarget.closest('.task');
    // change its classes so it becomes a completed task
    currentTask.classList.remove('task--todo');
    currentTask.classList.add('task--done');

    // find the progress bar to fill it
    const currentTaskProgressBar = currentTask.querySelector('.progress-bar');
    // change its completion percentage
    currentTaskProgressBar.style.width = '100%';
  },

  /**
   * handler on add task form submission
   * 
   * @param {event} event EventObject representation
   * @link pour FormData https://developer.mozilla.org/en-US/docs/Web/API/FormData
   */
  handleAddTaskFormSubmit: function(event) {
    // prevent the page from refreshing itself on submit
    event.preventDefault();
    
    // get the form data
    const addTaskForm = event.currentTarget.querySelector('.task--add__form');
    const addTaskFormData = new FormData(addTaskForm);
    const taskTitle = addTaskFormData.get('title');
    const taskCategory = addTaskFormData.get('category');
    console.log(taskTitle, taskCategory);

    // get the template in index.html
    const emptyTaskTemplate = document.getElementById('empty-task');
    // clone its content
    const newTask = emptyTaskTemplate.content.querySelector('.task').cloneNode(true);
    console.log(newTask);
    // complete the clone with form's data
    newTask.querySelector('.task__content__p').textContent = taskTitle;
    newTask.querySelector('.task__content__category__p').textContent = taskCategory;

    // insert the new task
    // get the task container
    const taskListContainer = document.getElementById('taskList-container');
    taskListContainer.prepend(newTask);

  }
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    