const app = {

  /***************************************************************
   * Initialization
   ***************************************************************/

  apiURL: "http://localhost:8080/",

  taskListContainer: document.getElementById('taskList-container'),

  init: function() {
    console.log('init');

    //* initialise the request to the API to retrieve the categoryList
    app.fetchCategories();

    //* initialise the request to the API to retrieve the taskList
    app.fetchTasks();

    //* get the form to add a task
    const addTaskForm = document.querySelector('.task--add');
    // we add the listener
    addTaskForm.addEventListener('submit', app.handleAddTaskFormSubmit);
},

  /***************************************************************
   * Categories
   ***************************************************************/

  /**
   * Fetch Categories from API
   */
  fetchCategories: function() {
    fetch(
      app.apiURL + '/categories',
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        console.log(response.status + ' ' + response.statusText + ' - Une erreur est survenue lors de la requête à l\'API')
      }
      // transform the response into usable data
      return response.json();
    })
    .then(function(categoryList) {
      // display category menus
      app.displayCategoryMenus(categoryList);
    })
  },

  /**
   * Method to display both categoryMenus 
   * @param categoryList
   */
  displayCategoryMenus: function(categoryList) {
    // we get all the category menus
    let navList = document.querySelectorAll('.selectCategoryMenu');

    // for each menu, we will execute the method to create the menu
    for (nav of navList) {
      app.createCategoryMenu(categoryList);
    }
  },

  /**
   * Method to create category menu
   * 
   * @param categoryList
   */
  createCategoryMenu: function (categoryList) {

    //* create and place the select
    const selectElement = document.createElement('select');
    // give it the name attribute
    selectElement.name = "categoryId";
    // give it CSS classes
    selectElement.classList.add('custom-select', 'category-select');
    // insert into the DOM
    nav.appendChild(selectElement);

    //* create the placeholder
    const selectPlaceHolderElement = document.createElement('option');
    // selected by default
    selectPlaceHolderElement.selected = true;
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

    //* create the different options according to the category list
    for (category of categoryList) {
      // create the option tag
      const optionElement = document.createElement('option');
      // give it the name of the category
      optionElement.textContent = category.name;
      // give it the id as value
      optionElement.value = category.id;
      // insert into select
      selectElement.appendChild(optionElement);
    }

  },

  /***************************************************************
   * Tasks
   ***************************************************************/

  /**
   * Fetch Tasks from API
   */
  fetchTasks: function() {
    fetch(
      app.apiURL + '/tasks',
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        console.log(response.status + ' ' + response.statusText + ' - Une erreur est survenue lors de la requête à l\'API')
      }
      // transform the response into usable data
      return response.json();
    })
    .then(function(taskList) {
      // display all tasks
      app.displayAllTasks(taskList);
    })
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
    const taskCategory = addTaskFormData.get('categoryId');

    //* create the request body
    const fetchBody = {
      title: taskTitle,
      categoryId: taskCategory
    };

    //* fetch new task to the API
    fetch(
      app.apiURL + 'tasks',
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
        return console.log('Une erreur est survenue lors de l\'ajout de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function(task) {
      app.displayOneTask(task.id, task.title, task.category.id, task.category.name, task.status, task.completion);

      // empty the category in the form
      const addTaskSelectedByDefault = addTaskForm.querySelector('.selectedOptionByDefault');
      addTaskSelectedByDefault.selected = true;
      
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

    // ARCHIVE BUTTON
    // we select the archive button 
    const archiveButton = task.querySelector('.task__content__button__archive');
    // we add the listener
    archiveButton.addEventListener('click', app.handleArchiveButton);

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
    const currentTask = event.currentTarget.closest('.task');
    const currentTaskId = event.currentTarget.closest('.task').dataset.id;

    //* create the request body
    const fetchBody = {
      completion: 100, // at the time we decide to change its completion to 100%
      status: 2 // 2 = done status
    };

    //* fetch changes to the API
    fetch(
      app.apiURL + 'tasks/' + currentTaskId,
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
        return console.log('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function(task) {
      // change current task status
      currentTask.dataset.status = task.status;
      // change current task completion
      currentTask.dataset.completion = task.completion;
      currentTask.querySelector('.progress-bar').style.width = task.completion + '%';

      // change its classes so it becomes a completed task
      currentTask.classList.remove('task--todo');
      currentTask.classList.add('task--done');
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
        app.apiURL + 'tasks/' + currentTaskId,
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
          return console.log('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
        }
        // transform the response into usable data
        return response.json()
      })
      .then(function(task) {
        // change current task status
        currentTask.dataset.status = task.status;

        // change CSS
        currentTask.classList.remove('task--todo');
        currentTask.classList.remove('task--done');
        currentTask.classList.add('task--archive');
      });
    }
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
      app.apiURL + 'tasks/' + currentTaskId,
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
        return console.log('Une erreur est survenue lors de la mise à jour de la tâche. Merci de reessayer ultérieurement');
      }
      // transform the response into usable data
      return response.json()
    })
    .then(function(task) {
      // change title in paragraph
      const titleElement = currentTask.querySelector('.task__content__p');
      titleElement.textContent = task.title;
      // change CSS
      currentTask.classList.remove('task--edit');
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
      app.apiURL + 'tasks/' + currentTaskId,
      {
        method: 'DELETE'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        return console.log('Une erreur est survenue lors de la tentative de suppression de la tâche. Merci de reessayer ultérieurement');
      }
      app.taskListContainer.innerHTML = '';
      app.fetchTasks();
    })

  }
}

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    