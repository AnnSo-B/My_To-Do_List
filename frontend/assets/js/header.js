const header = {
  init: function() {
    console.log('header');    
    
    //* initialise listener on header button
    header.initHeaderListeners();
  },

  /**
  * Method to add listener to Status Filter Buttons and Archive Buttons which will execute fetchTasks method
  */
  initHeaderListeners: function() {
    // get the status buttons
    header.statusFilterButtons = document.querySelectorAll('.status-filter-button');
    for (let statusButtonIndex = 0; statusButtonIndex < header.statusFilterButtons.length; statusButtonIndex++) {
      header.statusFilterButtons[statusButtonIndex].addEventListener('click', tasks.fetchTasks)
    }

    // get the archive buttons
    header.archiveButtons = document.querySelectorAll('.archive-button');
    for (let archiveButtonIndex = 0; archiveButtonIndex < header.archiveButtons.length; archiveButtonIndex++) {
      header.archiveButtons[archiveButtonIndex].addEventListener('click', tasks.fetchTasks);
    }

    // get the category delete button
    categories.deleteCategoryButton.addEventListener('click', categories.deleteCategory);
  },

  /**
   * Method to display "Voir les archives"
   */
  displaySeeTheArchive: function() {
    for (archiveButtonIndex = 0; archiveButtonIndex < header.archiveButtons.length; archiveButtonIndex++) {
      if (header.archiveButtons[archiveButtonIndex].classList.contains('to-show')) {
        header.archiveButtons[archiveButtonIndex].classList.remove('to-hide');
      } else {
        header.archiveButtons[archiveButtonIndex].classList.add('to-hide');
      }
    }
  },

  /**
   * Method to focus on "Toutes" button
   */
  focusOnAllButton: function() {
    // we want to take the focus off of every button expected the "Toutes" button
    for (let statusButtonIndex = 0; statusButtonIndex < header.statusFilterButtons.length; statusButtonIndex++) {
      // we save the current button
      const statusFilterButton = header.statusFilterButtons[statusButtonIndex];

      // we change its css class to btn-light in cas it was btn-primary that we remove
      statusFilterButton.classList.remove('btn-primary');
      statusFilterButton.classList.add('btn-light');

      // it the current button is "toutes" button then we want this button to have btn-primary class instead of ligth
      // TODO : change 0 by constant created in tasks.js to dispay tasks to do
      if (parseInt(statusFilterButton.dataset.status) === 0) {
        statusFilterButton.classList.remove('btn-light');
        statusFilterButton.classList.add('btn-primary');
      }
    }
  },
};