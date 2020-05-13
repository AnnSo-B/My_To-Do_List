// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';

// component
const CategoryMenu = ({ selectedCategory, categoryList, onCategoryChange }) => (
  <select
    className="custom-select category-select"
    name="categoryId"
    value={selectedCategory}
    onChange={onCategoryChange}
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
  selectedCategory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCategoryChange: PropTypes.func,
};

// export
export default CategoryMenu;
