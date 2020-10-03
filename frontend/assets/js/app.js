const app = {

  /***************************************************************
   * Initialization
   ***************************************************************/

  apiURL: "http://localhost:8080",

  init: function() {
    console.log('init');

    //* initialize cateogirues
    categories.init();

    //* initialize tasks
    tasks.init();

    //* initialize header
    header.init();

    //* initialize errorMessages
    errorMessages.init();
  },
};

/* Listen to the end of the DOM loading to initialize app */
document.addEventListener('DOMContentLoaded', app.init);
    