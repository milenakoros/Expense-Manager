import React from "react";
import { Link } from "react-router-dom";

const UserCategoryItem = ({ category, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Czy na pewno chcesz usunąć kategorię "${category.name}"?`)) {
      onDelete(category.id);
    }
  };

  return (
    <div className="category-item">
      <h3>{category.name}</h3>
      <p>{category.description || "Brak opisu"}</p>
      <div className="category-actions">
        <Link to={`/user/categories/${category.id}/edit`} className="btn btn-edit">
          Edytuj
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Usuń
        </button>
      </div>
    </div>
  );
};

export default UserCategoryItem;
