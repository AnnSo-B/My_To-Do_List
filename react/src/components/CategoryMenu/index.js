// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';

// component
const CategoryMenu = ({ selectedCategory, categoryList }) => (
  <select
    className="custom-select category-select"
    name="categoryId"
    value={selectedCategory}
  >
    <option
      className="selectedOptionByDefault"
      selected
      disabled
      value={0}
    >
      Choisir une catégorie
    </option>
    {
      categoryList.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
      ))
    }
  </select>
);

// Props validation
CategoryMenu.propTypes = {
  selectedCategory: PropTypes.number.isRequired,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// export
export default CategoryMenu;
