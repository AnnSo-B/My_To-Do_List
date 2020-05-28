const app = {

  /***************************************************************
   * Initialization
   ***************************************************************/

  apiURL: "http://localhost:8080",

  taskListContainer: document.getElementById('taskList-container'),

  init: function() {
    console.log('init');

    //* initialise the request to the API to retrieve the categoryList
    app.fetchCategories();

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

    //* initialise error message container
    app.errorMessageContainer = document.querySelector('#error-message-container');
},

  /***************************************************************
   * Navigation status filters
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
  },

  /***************************************************************
   * Error Messages
   ***************************************************************/

   /**
    * Method to display Error Messages
    */
  displayErrorMessage: function(message) {
    //* create and place the message
    const errorMessageElement = document.createElement('div');
    // give its css classes
    errorMessageElement.classList.add('alert', 'alert-danger', 'my-3');
    // git its content
    errorMessageElement.textContent = message;
    // insert into the DOM
    app.errorMessageContainer.appendChild(errorMessageElement);

    // delete the message after 10 secondes
    setTimeout(app.deleteErrorMessage, 10000)
  },

  /**
   * Method to delete error message
   */
 deleteErrorMessage: function() {
   app.errorMessageContainer.innerHTML = '';
 },

  /***************************************************************
   * Categories
   ***************************************************************/

  /**
   * Fetch Categories from API
   */
  fetchCategories: function(selectedCategory = '') {
    fetch(
      app.apiURL + '/categories',
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        app.displayErrorMessage(response.status + ' ' + response.statusText + ' - Une erreur est survenue lors de la requête à l\'API. Merci de recommencer ultérieurement.')
      }
      // transform the response into usable data
      return response.json();
    })
    .then(function(categoryList) {
      // display category menus
      // we pass selected category in case of a fetch following a category addition
      app.displayCategoryMenus(categoryList, selectedCategory);
    })
    .then(function() {
      app.hideNewCategoryInput();
    });
  },

  /**
   * Method to display both categoryMenus 
   * @param categoryList
   */
  displayCategoryMenus: function(categoryList, selectedCategory) {
    // we get all the category menus
    let navList = document.querySelectorAll('.selectCategoryMenu');

    // for each menu, we will execute the method to create the menu
    for (nav of navList) {
      // we empty the nav in case its a new extraction
      nav.innerHTML = '';
      // we create the menu
      app.createCategoryMenu(categoryList, selectedCategory);
    }
  },

  /**
   * Method to create category menu
   * 
   * @param categoryList
   */
  createCategoryMenu: function (categoryList, selectedCategory) {
    //* create and place the select
    const selectElement = document.createElement('select');
    app.createSelect(nav, selectElement);

    //* create the placeholder
    selectPlaceHolderElement = app.createPlaceHolder(selectElement, selectedCategory);

    //* create add a category option only on add task form
    if (nav.getAttribute('id') === 'task--add__category-select') {
      app.createAddCategoryOption(selectElement);
    }

    //* create the different options according to the category list
    for (category of categoryList) {
      app.createAnOption(selectElement, selectedCategory);
    }

    // add listeners
    if (nav.getAttribute('id') === 'navbar__category-select') {
      app.addNavCategoryMenuListener();
    }
    else if (nav.getAttribute('id') === 'task--add__category-select') {
      app.addNewTaskCategoryMenuListener();
    }
  },

  /**
   * Method to create the select
   */
  createSelect: function(nav, selectElement) {
    // give it the name attribute
    selectElement.name = "categoryId";
    // give it CSS classes
    selectElement.classList.add('custom-select', 'category-select');
    // insert into the DOM
    nav.appendChild(selectElement);
  },

  /**
   * Method to create the placeholder
   */
  createPlaceHolder: function(selectElement, selectedCategory) {
    selectPlaceHolderElement = document.createElement('option');
    // selected by default
    selectPlaceHolderElement.selected = true;
    // but if we are in the add task form we want to check if we have just add a new category to display this one by default
    if (nav.getAttribute('id') === 'task--add__category-select') {
      selectedCategory === '' 
        ? selectPlaceHolderElement.selected = true
        : selectPlaceHolderElement.selected = false;
    }
    // cannot be chosen
    selectPlaceHolderElement.disabled = true;
    // is not displayed
    selectPlaceHolderElement.style.display = 'none';
    // content
    selectPlaceHolderElement.textContent = 'Choisir une catégorie';
    // CSS class
    selectPlaceHolderElement.classList.add('selectedOptionByDefault');
    // insert into select
    selectElement.appendChild(selectPlaceHolderElement);
  },

  /**
   * Method to create an Option to add a category
   */
  createAddCategoryOption: function(selectElement) {
    // create the option tag
    const optionElement = document.createElement('option');
    // give it the name of the category
    optionElement.textContent = "Créer une catégorie";
    // give it the id as value
    optionElement.value = 1;
    // insert into select
    selectElement.appendChild(optionElement);
  },

  /**
   * Method to create an Option
   */
  createAnOption: function(selectElement, selectedCategory) {
    // create the option tag
    const optionElement = document.createElement('option');
    // give it the name of the category
    optionElement.textContent = category.name;
    // give it the id as value
    optionElement.value = category.id;
    // if we are in the add task form we want to check if we have just add a new category to display this one by default
    if (nav.getAttribute('id') === 'task--add__category-select') {
      selectedCategory === category.id
        ? optionElement.selected = true
        : optionElement.selected = false;
    }
    // insert into select
    selectElement.appendChild(optionElement);
  },

  /**
   * Method to add listener on Category menu in the header and fetch data according to this selection
   */
  addNavCategoryMenuListener: function() {
    app.navCategoryMenu = document.querySelector('#navbar__category-select select');
    app.navCategoryMenu.addEventListener('change', app.fetchTasks);
  },

  /**
   * Method to add listener on Category menu in the add task form and display input to create a new category if category is "créer une catégorie"
   */
  addNewTaskCategoryMenuListener: function() {
    app.newTaskCategoryMenu = document.querySelector('#task--add__category-select select');
    app.newTaskCategoryMenu.addEventListener('change', app.displayNewCategoryInput);
  },

  /**
   * Method to display category management button
   */
  displayCategoryDeleteButton: function() {
    app.categoryButtons = document.querySelector('.category__buttons');
    app.categoryButtons.classList.add('category--delete')
  },


  /**
   * Method to display category management button
   */
  hideCategoryDeleteButton: function() {
    app.categoryButtons = document.querySelector('.category__buttons');
    app.categoryButtons.classList.remove('category--delete')
  },
  /**
   * Method to display the input to create a new category
   */
  displayNewCategoryInput: function(event) {
    if (parseInt(event.currentTarget.value) === 1) {
      // we change the select css to display the input and not the list of selection
      // app.editCategory = event.currentTarget.closest('.task--add');
      app.addTaskForm.classList.add('category--edit');

      // we focus on this input and had a listener on the input to save the new category on blur
      app.newCategoryInput = document.querySelector('.category__name__input');
      app.newCategoryInput.focus();
      app.newCategoryInput.addEventListener('blur', app.addNewCategoryOnBlur);
    }
  },

  /**
   * Method to hide the input to create a new category
   */
  hideNewCategoryInput: function() {
    app.addTaskForm.classList.remove('category--edit');
  },

  /**
   * save the new category
   */
  addNewCategoryOnBlur: function(event) {
    console.log('addNewCategoryOnBlur', event.currentTarget.value);

    // create the request body
    const fetchBody = {
      name: event.currentTarget.value,
    };

    // fetch new category to the API
    fetch(
      app.apiURL + '/categories',
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
        app.displayErrorMessage('Une erreur est survenue lors de l\'ajout de la catégorie. Merci de reessayer ultérieurement')
      }
      // transform the response into usable data
      return response.json()
    })
    // fetch category and select the new category
    .then(function(category) {
      app.fetchCategories(category.id)
    })
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
      app.deleteErrorMessage();

      // we retrieve the status from this button
      app.statusValue = parseInt(event.currentTarget.dataset.status);
      // if this button is one of the archive button
      if (event.currentTarget.closest('.archive-button')) {
        // we save the one that has been clicked
        currentArchiveButton = event.currentTarget.closest('.archive-button');
        // we retrieve the status from this button
        app.statusValue = parseInt(currentArchiveButton.dataset.status);
      }
      // if this button is one of the staut filter button
      else if (event.currentTarget.closest('.status-filter-button')) {
        // we save the one that has been clicked
        currentStatusButton = event.currentTarget.closest('.status-filter-button');
        // we retrieve the status from this button
        app.statusValue = parseInt(currentStatusButton.dataset.status);
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
        app.displayErrorMessage(response.status + ' ' + response.statusText + ' - Une erreur est survenue lors de la requête à l\'API. Merci de recommencer ultérieurement.')
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
          app.focusOnChooseACategory(app.navCategoryMenu);
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
          const navCategoryMenuSelectedByDefault = app.navCategoryMenu.querySelector('.selectedOptionByDefault');
          navCategoryMenuSelectedByDefault.selected = true;
        }

        // if the event is on the category filter menu
        else if (currentCategoryFilter !== '') {
          //* if there are no tasks send a message
          if (taskList.length < 1) {
            app.displayErrorMessage('Aucune tâche ne correspond à votre filtre.');

            //* to display delete a category button only if the category returns no task
            app.displayCategoryDeleteButton();
          }
          else {
            //* to hide delete a category buttonif the extraction returns at least one task
            app.hideCategoryDeleteButton();
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
   * focus on "Choisir une catégorie"
   */
  focusOnChooseACategory: function(menu) {
    const categoryByDefault = menu.querySelector('.selectedOptionByDefault');
    categoryByDefault.selected = true;
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
        app.displayErrorMessage('Une erreur est survenue lors de l\'ajout de la tâche. Merci de reessayer ultérieurement')
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function(task) {
      app.displayOneTask(task.id, task.title, task.category.id, task.category.name, task.status, task.completion);

      // empty the category in the form
      app.focusOnChooseACategory(addTaskForm);
      
      // empty the input and place yourself back on the input for data entry
      const addTaskInput = addTaskForm.querySelector('.task__content__input');
      addTaskInput.value = '';
      addTaskInput.focus();
      addTaskInput.select();
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
    const buttonCSS = event.currentTarget.classList;
    console.log(buttonCSS);


    //* find the task id associated with the validate button
    const currentTask = event.currentTarget.closest('.task');
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* create the request body
    let fetchBody = {
      completion: 100, // at the time we decide to change its completion to 100%
      status: 2 // 2 = done status
    };

    //* fetch changes to the API
    fetch(
      app.apiURL + '/tasks/' + currentTaskId,
      {
        method: 'PUT',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(fetchBody)
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        app.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
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
   * handler on validate button : 
   * change current class and change progression bar
   * 
   * @param {event} event EventObject representation
   */
  handleIncompleteButton: function(event) {
    //* find the task id associated with the incomplete button
    const currentTask = event.currentTarget.closest('.task');
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* create the request body
    const fetchBody = {
      completion: 0, // at the time we decide to change its completion to 0%
      status: 1 // 1 = todo status
    };

    //* fetch changes to the API
    fetch(
      app.apiURL + '/tasks/' + currentTaskId,
      {
        method: 'PUT',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(fetchBody)
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        app.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function() {
      // refresh the task list with the changes
      app.refreshTaskList();
    });
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
    fetch(
      app.apiURL + '/tasks/' + currentTaskId,
      {
        method: 'PUT',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(fetchBody)
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        app.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
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
      fetch(
        app.apiURL + '/tasks/' + currentTaskId,
        {
          method: 'PUT',
          headers: {
            "Content-Type" : "application/json" // we send Json data
          },
          body: JSON.stringify(fetchBody)
        }
      )
      .then(function(response) {

        // check if the response is not ok
        if (!response.ok) {
          app.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
        }
        // transform the response into usable data
        return response.json()
      })
      .then(function(task) {
        // refresh the task list with the changes
      app.refreshTaskList();
      });
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
    fetch(
      app.apiURL + '/tasks/' + currentTaskId,
      {
        method: 'PUT',
        headers: {
          "Content-Type" : "application/json" // we send Json data
        },
        body: JSON.stringify(fetchBody)
      }
    )
    .then(function(response) {

      // check if the response is not ok
      if (!response.ok) {
        app.displayErrorMessage('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function() {
      // refresh the task list with the changes
      app.refreshTaskList();
    });
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
        app.displayErrorMessage('Une erreur est survenue lors de la tentative de suppression de la tâche. Merci de reessayer ultérieurement');
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
    