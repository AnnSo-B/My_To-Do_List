const app = {

  /***************************************************************
   * Initialization
   ***************************************************************/

  apiURL: "http://localhost:8080",

  taskListContainer: document.getElementById('taskList-container'),

  init: function() {
    console.log('init');

    //* initialize cateogirues
    categories.init();

    //* initialise status filter value
    app.statusValue = 0;

    //* initialise the request to the API to retrieve the taskList
    app.fetchTasks();

    //* get the form to add a task
    app.addTaskForm = document.querySelector('.task--add');
    // we add the listener
    app.addTaskForm.addEventListener('submit', app.handleAddTaskFormSubmit);

    //* initialise listener on header button
    app.initHeaderListeners();

    //* initialse errorMessages
    errorMessages.init();
},

  /***************************************************************
   * Header listeners
   ***************************************************************/

   /**
    * Method to add listener to Status Filter Buttons and Archive Buttons which will execute fetchTasks method
    */
   initHeaderListeners: function() {
    // get the status buttons
    app.statusFilterButtons = document.querySelectorAll('.status-filter-button');
    for (let statusButtonIndex = 0; statusButtonIndex < app.statusFilterButtons.length; statusButtonIndex++) {
      app.statusFilterButtons[statusButtonIndex].addEventListener('click', app.fetchTasks)
    }

    // get the archive buttons
    app.archiveButtons = document.querySelectorAll('.archive-button');
    for (let archiveButtonIndex = 0; archiveButtonIndex < app.archiveButtons.length; archiveButtonIndex++) {
      app.archiveButtons[archiveButtonIndex].addEventListener('click', app.fetchTasks);
    }

    // get the category delete button
    categories.deleteCategoryButton.addEventListener('click', categories.deleteCategory);
  },

  /***************************************************************
   * Tasks
   ***************************************************************/

  /**
   * Fetch Tasks from API
   */
  fetchTasks: function(event) {

    // by default, we'll fetch all the tasks
    let requestGoesTo = app.apiURL + '/tasks';

    // if this fetch follow a click we'll need some information to determine which button has been clicked
    let currentStatusButton = '';
    let currentArchiveButton = '';
    // or which category has been selected
    let currentCategoryFilter = '';

    // we need to determine which event led to this search
    // if the event is not undefined, it means that it's either a status filter or a category filter
    if (typeof(event) !== 'undefined') {

      // we delete the error message if there are
      errorMessages.deleteErrorMessage();

      // we retrieve the status from this button
      app.statusValue = parseInt(event.currentTarget.dataset.status);
      // if this button is one of the archive button
      if (event.currentTarget.closest('.archive-button')) {
        // we save the one that has been clicked
        currentArchiveButton = event.currentTarget.closest('.archive-button');
        // we retrieve the status from this button
        app.statusValue = parseInt(currentArchiveButton.dataset.status);
        // hide the category delete button
        categories.hideCategoryDeleteButton();
      }
      // if this button is one of the staut filter button
      else if (event.currentTarget.closest('.status-filter-button')) {
        // we save the one that has been clicked
        currentStatusButton = event.currentTarget.closest('.status-filter-button');
        // we retrieve the status from this button
        app.statusValue = parseInt(currentStatusButton.dataset.status);
        // hide the category delete button
        categories.hideCategoryDeleteButton();
      }
      else if (event.currentTarget.closest('#navbar__category-form')) {
        // when filtering on categories, the tasks are of any statuss
        app.statusValue = 0;
        // we retrieve the id of the selected category
        currentCategoryFilter = parseInt(event.currentTarget.value);
        // we change the url that has to be send to the API
        requestGoesTo = app.apiURL + '/tasks/category/' + currentCategoryFilter; 
      }
    }

    // if the status is different from 0, we know that we are looking for a task list accorind to their status
    if (app.statusValue !== 0) {
      requestGoesTo = app.apiURL + '/tasks/status/' + app.statusValue;
    }

    // we now can launch the request
    fetch(
      // to the url previously determine
      requestGoesTo,
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        errorMessages.displayErrorMessage(response.status + ' ' + response.statusText + ' - Une erreur est survenue lors de la requête à l\'API. Merci de recommencer ultérieurement.')
      }
      // transform the response into usable data
      return response.json();
    })
    .then(function(taskList) {
      // empty the containter
      app.taskListContainer.innerHTML = '';

      // display all tasks
      app.displayAllTasks(taskList);

      // change css on buttons only if the event is defined
      if (typeof(event) !== 'undefined') {

        // if the event is on a status button and its value is either 0, or 1, or 2
        if (
          currentStatusButton !== ''
          && (app.statusValue === 0 || app.statusValue === 1 || app.statusValue === 2)
        ) {
          // we want to make the following changes
          //* for status Buttons
          // we want to take the focus off of every button
          for (let statusButtonIndex = 0; statusButtonIndex < app.statusFilterButtons.length; statusButtonIndex++) {
            app.statusFilterButtons[statusButtonIndex].classList.remove('btn-primary');
            app.statusFilterButtons[statusButtonIndex].classList.add('btn-light');
          }
          // to apply it only on the current button
          currentStatusButton.classList.remove('btn-light');
          currentStatusButton.classList.add('btn-primary');

          //* for archive buttons
          // we want to display "Voir les archives"
          app.displaySeeTheArchive();

          //* for the category filter
          // empty the category in the filter
          categories.focusOnChooseACategory(categories.navCategoryMenu);
        }

        // if the event is on the archive buttons and its value is either 3 or 0
        else if (
          currentArchiveButton !== ''
          && (app.statusValue === 3 || app.statusValue === 0)
        ) {
          //* for status buttons 
          // we want to take the focus off of every button expected the "Toutes" button
          app.focusOnAllButton();

          //* for archive buttons
          // we display the other archive button when its clicked on
          for (archiveButtonIndex = 0; archiveButtonIndex < app.archiveButtons.length; archiveButtonIndex++) {
            app.archiveButtons[archiveButtonIndex].classList.remove('to-hide');;
          }
          currentArchiveButton.classList.add('to-hide');

          //* for the category filter
          // empty the category in the filter
          const navCategoryMenuSelectedByDefault = categories.navCategoryMenu.querySelector('.selectedOptionByDefault');
          navCategoryMenuSelectedByDefault.selected = true;
        }

        // if the event is on the category filter menu
        else if (currentCategoryFilter !== '') {
          //* if there are no tasks send a message
          if (taskList.length < 1) {
            errorMessages.displayErrorMessage('Aucune tâche ne correspond à votre filtre.');
          }

          //* for status buttons 
          // we want to take the focus off of every button expected the "Toutes" button
          app.focusOnAllButton();

          //* for archive buttons
          // we want to display "Voir les archives"
          app.displaySeeTheArchive();
        }
      }
    })
  },

  /**
   * Method to display "Voir les archives"
   */
  displaySeeTheArchive: function() {
    for (archiveButtonIndex = 0; archiveButtonIndex < app.archiveButtons.length; archiveButtonIndex++) {
      if (app.archiveButtons[archiveButtonIndex].classList.contains('to-show')) {
        app.archiveButtons[archiveButtonIndex].classList.remove('to-hide');
      }
      else {
        app.archiveButtons[archiveButtonIndex].classList.add('to-hide');
      }
    }
  },

  /**
   * Method to focus on "Toutes" button
   */
  focusOnAllButton: function() {
    // we want to take the focus off of every button expected the "Toutes" button
    for (let statusButtonIndex = 0; statusButtonIndex < app.statusFilterButtons.length; statusButtonIndex++) {
      // we save the current button
      statusFilterButton = app.statusFilterButtons[statusButtonIndex];

      // we change its css class to btn-light in cas it was btn-primary that we remove
      statusFilterButton.classList.remove('btn-primary');
      statusFilterButton.classList.add('btn-light');

      // it the current button is "toutes" button then we want this button to have btn-primary class instead of ligth
      if (parseInt(statusFilterButton.dataset.status) === 0) {
        statusFilterButton.classList.remove('btn-light');
        statusFilterButton.classList.add('btn-primary');
      }
    }
  },

  /**
   * Method to display all tasks
   * 
   * @param taskList from API
   */
  displayAllTasks: function(taskList) {
    
    // for each task we'll want to add it into the DOM
    for (taskIndex = 0; taskIndex < taskList.length; taskIndex++) {
      const task = taskList[taskIndex];
      app.displayOneTask(task.id, task.title, task.category.id, task.category.name, task.status, task.completion);
    }
  },

  /**
   * Method to display a task
   * 
   * @param {string} id Task id
   * @param {string} title Task title
   * @param {int} categoryId task's category ID
   * @param {string} categoryName task's category name
   * @param {int} status Task status
   * @param {int} completion Task completion
   */
  displayOneTask: function(id, title, categoryId, categoryName, status, completion) {
    //* Templating
    // get the template in index.html
    const emptyTaskTemplate = document.getElementById('empty-task');
    // clone its content
    const task = emptyTaskTemplate.content.querySelector('.task').cloneNode(true);

    //* Save data into DOM element
    task.dataset.id = id;
    task.dataset.name = name;
    task.dataset.categoryId = categoryId;
    task.dataset.status = status;
    task.dataset.completion = completion;

    //* CSS Classes
    switch (status) {
      case 2:
        task.classList.add('task--done')
        break;
      case 3:
        task.classList.add('task--archive', 'task--display_none')
        break;
      default: // 1 - todo
        task.classList.add('task--todo')
        break;
    }

    //* complete the clone with task data
    task.querySelector('.task__content__input').value = title;
    task.querySelector('.task__content__p').textContent = title;
    task.querySelector('.task__content__category__p').textContent = categoryName;
    task.querySelector('.progress-bar').style.width = completion + '%';

    // add listener on newTask button
    app.addTaskEventListener(task);

    // insert the new task
    // get the task container
    app.taskListContainer.prepend(task);
  },


  /***************************************************************
   * Tasks handlers
   **************************************************************/

  /**
   * handler on add task form submission
   * 
   * @param {event} event EventObject representation
   * @link pour FormData https://developer.mozilla.org/en-US/docs/Web/API/FormData
   */
  handleAddTaskFormSubmit: function(event) {
    //* prevent the page from refreshing itself on submit
    event.preventDefault();
    
    //* get the form data
    const addTaskForm = event.currentTarget.querySelector('.task--add__form');
    const addTaskFormData = new FormData(addTaskForm);
    const taskTitle = addTaskFormData.get('title');
    const taskCategory = parseInt(addTaskFormData.get('categoryId'));

    //* create the request body
    const fetchBody = {
      title: taskTitle,
      categoryId: taskCategory
    };

    //* fetch new task to the API
    fetch(
      app.apiURL + '/tasks',
      {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(fetchBody)
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        errorMessages.displayErrorMessage('Une erreur est survenue lors de l\'ajout de la tâche. Merci de reessayer ultérieurement')
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function(task) {
      app.displayOneTask(task.id, task.title, task.category.id, task.category.name, task.status, task.completion);

      // empty the category in the form
      categories.focusOnChooseACategory(addTaskForm);
      
      // empty the input and place yourself back on the input for data entry
      const addTaskInput = addTaskForm.querySelector('.task__content__input');
      addTaskInput.value = '';
      addTaskInput.focus();
      addTaskInput.select();

      // fetch categories and hide delete button on category filter
      categories.fetchCategories();
      categories.hideCategoryDeleteButton();
      app.refreshTaskList();
      errorMessages.deleteErrorMessage();
    });
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

    // INCOMPLETE BUTTON
    // we select the delete button 
    const incompleteButton = task.querySelector('.task__content__button__incomplete');
    // we add the listener
    incompleteButton.addEventListener('click', app.handleIncompleteButton);

    // MODIFY BUTTON
    // we select the modify button 
    const modifyButton = task.querySelector('.task__content__button__modify');
    // we add the listener
    modifyButton.addEventListener('click', app.handleModifyButton);

    // TITLE INPUT
    // we select the title input 
    const titleInput = task.querySelector('.task__content__input[name="title"]');
    // we add the listeners
    titleInput.addEventListener('blur', app.handleEditTitle);
    titleInput.addEventListener('keydown', app.handleEditTitle);

    // ARCHIVE BUTTON
    // we select the archive button 
    const archiveButton = task.querySelector('.task__content__button__archive');
    // we add the listener
    archiveButton.addEventListener('click', app.handleArchiveButton);

    // DESARCHIVE BUTTON
    // we select the archive button 
    const desarchiveButton = task.querySelector('.task__content__button__desarchive');
    // we add the listener
    desarchiveButton.addEventListener('click', app.handleDesarchiveButton);

    // DELETE BUTTON
    // we select the delete button 
    const deleteButton = task.querySelector('.task__content__button__delete');
    // we add the listener
    deleteButton.addEventListener('click', app.handleDeleteButton);
  },

  /**
   * handler on validate button : 
   * change current class and change progression bar
   * 
   * @param {event} event EventObject representation
   */
  handleValidateButton: function(event) {
    //* find the task id associated with the validate button
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* create the request body
    let fetchBody = {
      completion: 100, // at the time we decide to change its completion to 100%
      status: 2 // 2 = done status
    };

    //* fetch changes to the API
    app.updateTask(currentTaskId, fetchBody);
  },

  /**
   * handler on validate button : 
   * change current class and change progression bar
   * 
   * @param {event} event EventObject representation
   */
  handleIncompleteButton: function(event) {
    //* find the task id associated with the incomplete button
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* create the request body
    const fetchBody = {
      completion: 0, // at the time we decide to change its completion to 0%
      status: 1 // 1 = todo status
    };

    //* fetch changes to the API
    app.updateTask(currentTaskId, fetchBody);
  },

  /**
   * handler on modify button
   * 
   * @param {event} event EventObject representation
   */
  handleModifyButton: function(event) {
    //* get current task
    const currentTask = event.currentTarget.closest('.task');

    //* change its CSS
    currentTask.classList.add('task--edit');

    //* focus on the input
    const inputTitleElement = currentTask.querySelector('.task__content__input');
    inputTitleElement.focus();
    inputTitleElement.select();  
  },

  /**
   * handler on input to edit
   * 
   * @param {event} event EventObject representation
   */
  handleEditTitle: function(event) {
    // we want that the entry key to validate changes otherwise we do nothing
    if (event.type === 'keydown' && event.keyCode !== 13) {
      return;
    }

    // if the event is keydown on 13 or blur, we want to update the task
    //* find the task id associated with the edited input and get the value
    const currentTask = event.currentTarget.closest('.task');
    const currentTaskId = currentTask.dataset.id;

    //* modified title
    const modifiedTitle = event.currentTarget.value;

    //* create the request body
    const fetchBody = {
      title: modifiedTitle,
    };

    //* fetch changes to the API
    app.updateTask(currentTaskId, fetchBody);
  },

  /**
   * handler on archive button
   * 
   * @param {event} event EventObject representation
   */
  handleArchiveButton: function(event) {
    // confirm the action
    const result = window.confirm('Etes vous sûr de vouloir archiver cette tâche ?');
    
    // if the action is confirmed
    if (result) {
      // get current task
      const currentTask = event.currentTarget.closest('.task');
      const currentTaskId = currentTask.dataset.id;

      //* create the request body
      const fetchBody = {
        status: 3 // 3 = archive status
      };

      //* fetch changes to the API
     app.updateTask(currentTaskId, fetchBody);
    }
  },

  /**
   * handler on desarchive button
   * 
   * @param {event} event EventObject representation
   */
  handleDesarchiveButton: function(event) {
    // get current task
    const currentTask = event.currentTarget.closest('.task');
    const currentTaskId = currentTask.dataset.id;

    //* create the request body
    const fetchBody = {
      status: 2 // 2 = done status
    };

    //* fetch changes to the API
    app.updateTask(currentTaskId, fetchBody);
  },

  /**
   * update a task according to its id and the request body provided
   */
  updateTask: function(taskId, requestBody) {
    //* fetch changes to the API
    fetch(
      app.apiURL + '/tasks/' + taskId,
      {
        method: 'PUT',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(requestBody)
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        errorMessages.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function() {
      // refresh the task list with the changes
      app.refreshTaskList();
    })
  },

  /**
   * handler on delete button
   * 
   * @param {event} event EventObject representation
   */
  handleDeleteButton: function(event) {
    // get current task id
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* fetch changes to the API
    fetch(
      app.apiURL + '/tasks/' + currentTaskId,
      {
        method: 'DELETE'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        errorMessages.displayErrorMessage('Une erreur est survenue lors de la tentative de suppression de la tâche. Merci de reessayer ultérieurement');
      }

      // refresh the task list with the changes
      app.refreshTaskList();
    })
  },

  /**
   * method to refresh task list
   */
  refreshTaskList: function() {
    app.taskListContainer.innerHTML = '';
    app.fetchTasks();
  },
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    