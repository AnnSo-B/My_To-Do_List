// npm imports
import React from 'react';

// local imports
import './style.css';

// component
const CategoryMenu = () => (
  <div
    id="navbar__category-select"
    className="navbar-form-group my-3 selectCategoryMenu"
  >
    <select
      className="custom-select category-select"
      name="categoryId"
    >
      <option
        className="selectedOptionByDefault"
        selected
        disabled
        value={0}
      >
        Choisir une catégorie
      </option>
      <option
        value={1}
      >
        Courses
      </option>
      <option
        value={2}
      >
        Ecoles
      </option>
      <option
        value={3}
      >
        Vacances
      </option>
    </select>
  </div>
);

// Props validation

// export
export default CategoryMenu;
