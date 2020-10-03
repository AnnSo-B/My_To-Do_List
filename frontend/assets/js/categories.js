const NEW_CATEGORY = 'NEW_CATEGORY';

const categories = {
  init: function() {
    console.log('categories');

    //* initialise the request to the API to retrieve the categoryList
    categories.fetchCategories();

    //* get the category buttons in the header
    categories.categoryButtons = document.querySelector('.category__buttons');

    // get the category delete button
    categories.deleteCategoryButton = document.querySelector('.nav__category__menu__button__delete');
  },

  /**
   * Fetch Categories from API
   * @param int selectedCategory optional
   */
  fetchCategories: function(selectedCategory = '') {
    const requestGoesTo = `${app.apiURL}/categories`;

    fetch(
      requestGoesTo,
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        return errorMessages.displayErrorMessage(`${response.status} ${response.statusText} - Une erreur est survenue lors de la requête à l\'API. Merci de recommencer ultérieurement.`)
      }

      // transform the response into usable data
      return response.json();
    })
    .then(function(categoryList) {
      // display category menus
      // we pass selected category in case of a fetch following a category addition
      categories.displayCategoryMenus(categoryList, selectedCategory);
    })
    .then(function() {
      categories.hideNewCategoryInput();
    });
  },


  /**
   * Fetch Categories from API with their tasks
   * @param object event
   */
  fetchCategoriesWithTasks: function(event) {
    const categoryId = event.currentTarget.value;
    const requestGoesTo = `${app.apiURL}/categories/${categoryId}/tasks`;
    
    fetch(
      requestGoesTo,
      {
        method: 'GET'
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        return errorMessages.displayErrorMessage(`${response.status} ${response.statusText} - Une erreur est survenue lors de la requête à l\'API. Merci de recommencer ultérieurement.`)
      }

      // transform the response into usable data
      return response.json();
    })
    .then(function(categoryList) {
      if (categoryList[0].tasks.length < 1) {
        categories.displayCategoryDeleteButton(categoryId);
      } else {
        categories.hideCategoryDeleteButton();
      }
    })
  },

  /**
   * Method to display both categoryMenus 
   * @param object categoryList
   * @param int selectedCategory
   */
  displayCategoryMenus: function(categoryList, selectedCategory) {
    // we get all the category menus
    const navList = document.querySelectorAll('.selectCategoryMenu');

    // for each menu, we will execute the method to create the menu
    for (let nav of navList) {
      // we empty the nav in case its a new extraction
      nav.innerHTML = '';
      // we create the menu
      categories.createCategoryMenu(nav, categoryList, selectedCategory);
    }
  },

  /**
   * Method to create category menu
   * @param nav current menu
   * @param categoryList
   * @param selectedCategory
   */
  createCategoryMenu: function (nav, categoryList, selectedCategory) {
    //* create and place the select
    const selectElement = document.createElement('select');
    categories.createSelect(nav, selectElement);

    //* create the placeholder
    categories.createPlaceHolder(nav, selectElement, selectedCategory);

    //* create add a category option only on add task form
    if (nav.getAttribute('id') === 'task--add__category-select') {
      categories.createAddCategoryOption(selectElement);
    }

    //* create the different options according to the category list
    for (category of categoryList) {
      categories.createAnOption(nav, selectElement, selectedCategory);
    }

    //* add listeners
    if (nav.getAttribute('id') === 'navbar__category-select') {
      categories.addNavCategoryMenuListener();
    } else if (nav.getAttribute('id') === 'task--add__category-select') {
      categories.addNewTaskCategoryMenuListener();
    }
  },

  /**
   * Method to create the select
   * @param nav
   * @param selectElement
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
   * @param nav
   * @param selectElement
   * @param selectedCategory
   */
  createPlaceHolder: function(nav, selectElement, selectedCategory) {
    const selectPlaceHolderElement = document.createElement('option');
    // selected by default
    selectPlaceHolderElement.selected = true;
    // but if we are in the add task form we want to check if we have just add a new category to display this one by default

    if (nav.getAttribute('id') === 'task--add__category-select') {
      selectPlaceHolderElement.selected = selectedCategory === '';
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
   * @param selectElement
   */
  createAddCategoryOption: function(selectElement) {
    // create the option tag
    const optionElement = document.createElement('option');

    // give it the name of the category
    optionElement.textContent = "Créer une catégorie";
    // give it the id as value
    optionElement.value = NEW_CATEGORY;

    // insert into select
    selectElement.appendChild(optionElement);
  },

  /**
   * Method to create an Option
   * @param nav
   * @param selectElement
   * @param selectedCategory
   */
  createAnOption: function(nav, selectElement, selectedCategory) {
    // create the option tag
    const optionElement = document.createElement('option');

    // give it the name of the category
    optionElement.textContent = category.name;
    // give it the id as value
    optionElement.value = category.id;

    // if we are in the add task form we want to check if we have just add a new category to display this one by default
    if (nav.getAttribute('id') === 'task--add__category-select') {
      optionElement.selected = (selectedCategory === category.id)
    }

    // insert into select
    selectElement.appendChild(optionElement);
  },

  /**
   * Method to add listener on Category menu in the header and fetch data according to this selection
   */
  addNavCategoryMenuListener: function() {
    categories.navCategoryMenu = document.querySelector('#navbar__category-select select');
    categories.navCategoryMenu.addEventListener('change', categories.fetchCategoriesWithTasks);
    categories.navCategoryMenu.addEventListener('change', tasks.fetchTasks);
  },

  /**
   * Method to add listener on Category menu in the add task form and display input to create a new category if category is "créer une catégorie"
   */
  addNewTaskCategoryMenuListener: function() {
    const newTaskCategoryMenu = document.querySelector('#task--add__category-select select');
    newTaskCategoryMenu.addEventListener('change', categories.displayNewCategoryInput);
  },

  /**
   * Method to display category management button
   *
   * @param currentCategoryFilter
   */
  displayCategoryDeleteButton: function(currentCategoryFilter) {
    categories.categoryButtons.classList.add('category--delete');
    categories.currentCategoryToDelete = currentCategoryFilter;
  },


  /**
   * Method to display category management button
   */
  hideCategoryDeleteButton: function() {
    categories.categoryButtons.classList.remove('category--delete');
    categories.currentCategoryToDelete = '';
  },

  deleteCategory: function() {
    if (!window.confirm('Souhaitez-vous supprimer cette catégorie ?')) {
      return false;
    }

    // delete the category through the api
    fetch(
      `${app.apiURL}/categories/${categories.currentCategoryToDelete}`,
      {
        method: 'DELETE',
      }
    )
    .then(function(response) {
      // check if the response is not ok
      if (!response.ok) {
        return errorMessages.displayErrorMessage('Une erreur est survenue lors de la tentative de suppression de la catégorie. Merci de reessayer ultérieurement');
      }

      // refresh the task list with the changes
      categories.fetchCategories();
    })
  },

  /**
   * Method to display the input to create a new category
   */
  displayNewCategoryInput: function(event) {
    if (event.currentTarget.value === NEW_CATEGORY) {
      // we change the select css to display the input and not the list of selection
      // app.editCategory = event.currentTarget.closest('.task--add');
      tasks.addTaskForm.classList.add('category--edit');

      // we focus on this input and had a listener on the input to save the new category on blur
      const newCategoryInput = document.querySelector('.category__name__input');

      newCategoryInput.focus();
      newCategoryInput.addEventListener('blur', categories.addNewCategoryOnBlur);
    }
  },

  /**
   * Method to hide the input to create a new category
   */
  hideNewCategoryInput: function() {
    tasks.addTaskForm.classList.remove('category--edit');
  },

  /**
   * save the new category
   *
   * @param event
   */
  addNewCategoryOnBlur: function(event) {
    // create the request body
    const fetchBody = {
      name: event.currentTarget.value,
    };

    // fetch new category to the API
    fetch(
      `${app.apiURL}/categories`,
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
        return errorMessages.displayErrorMessage('Une erreur est survenue lors de l\'ajout de la catégorie. Merci de reessayer ultérieurement')
      }
      
      // transform the response into usable data
      return response.json()
    })
    // fetch category and select the new category
    .then(function(category) {
      categories.fetchCategories(category.id)
    })
  },

  /**
   * focus on "Choisir une catégorie"
   * 
   * @param menu
   */
  focusOnChooseACategory: function(menu) {
    const categoryByDefault = menu.querySelector('.selectedOptionByDefault');
    categoryByDefault.selected = true;
  },
};
