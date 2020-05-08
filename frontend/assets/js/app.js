const app = {

  apiURL: "http://localhost:8080/",

  init: function() {
    console.log('init');

    // initialise the request to the API to retrieve the categoryList
    app.fetchCategories();

    // get the list of the tasks
    const taskList = document.querySelectorAll('.task--todo, .task--complete, .task--done, .task--edit, .task--archive');

    // for each task we'll add a listener on the validate button
    for (let taskIndex = 0; taskIndex < taskList.length ; taskIndex++) {
      let task = taskList[taskIndex];
      // we add the listener
      app.addTaskEventListener(task);
    }

    // get the form to add a task
    const addTaskForm = document.querySelector('.task--add');
    // we add the listener
    addTaskForm.addEventListener('submit', app.handleAddTaskFormSubmit);
  },

  /**
   * Fetch Categories from API
   */
  fetchCategories: function() {
    console.log('fecth categories');
    fetch(
      app.apiURL + '/categories',
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      console.log(response);
    })

  },

  /**
   * add event listener on a task
   */
  addTaskEventListener: function(task) {

    // VALIDATE BUTTON
    // we select the validate button 
    const validateButton = task.querySelector('.task__content__button__validate');
    // we add the listener
    validateButton.addEventListener('click', app.handleValidateButton);

    // ARCHIVE BUTTON
    // we select the archive button 
    const archiveButton = task.querySelector('.task__content__button__archive');
    // we add the listener
    archiveButton.addEventListener('click', app.handleArchiveButton);
  },


  /***************************************************************
   * BUTTONS HANDLERS
   **************************************************************/

  /**
   * handler on validate button : 
   * change current class and change progression bar
   * 
   * @param {event} event EventObject representation
   */
  handleValidateButton: function(event) {
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
   * handler on archive button
   * 
   * @param {event} event EventObject representation
   */
  handleArchiveButton: function(event) {
    // get current task
    const currentTask = event.currentTarget.closest('.task');

    // confirm the action
    const result = window.confirm('Etes vous sûr de vouloir archiver cette tâche ?');
    console.log(currentTask);
    // if the action is confirmed
    if (result) {
      currentTask.classList.remove('task--todo');
      currentTask.classList.remove('task--done');
      currentTask.classList.add('task--archive');
    }
  },


  /***************************************************************
   * NEW TASK HANDLER
   **************************************************************/

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

    // get the template in index.html
    const emptyTaskTemplate = document.getElementById('empty-task');
    // clone its content
    const newTask = emptyTaskTemplate.content.querySelector('.task').cloneNode(true);
    // complete the clone with form's data
    newTask.querySelector('.task__content__p').textContent = taskTitle;
    newTask.querySelector('.task__content__category__p').textContent = taskCategory;

    // add listener on newTask button
    app.addTaskEventListener(newTask);

    // insert the new task
    // get the task container
    const taskListContainer = document.getElementById('taskList-container');
    taskListContainer.prepend(newTask);

    // empty the category in the form
    const addTaskCategory = addTaskForm.querySelector('.task--add .category-select');
    addTaskCategory.value = 'Toutes les catégories';
    // empty the input and place yourself back on the input for data entry
    const addTaskInput = addTaskForm.querySelector('.task__content__input');
    addTaskInput.value = '';
    addTaskInput.focus();
    addTaskInput.select();
  }
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    