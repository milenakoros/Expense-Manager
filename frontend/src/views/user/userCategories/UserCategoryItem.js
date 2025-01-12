import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserCategoryItem = ({ category, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: `Czy na pewno chcesz usunąć kategorię "${category.name}"?`,
      text: "Tej operacji nie można cofnąć.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń",
      cancelButtonText: "Anuluj",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(category.id);
        Swal.fire({
          icon: "success",
          title: "Usunięto",
          text: `Kategoria "${category.name}" została pomyślnie usunięta.`,
          confirmButtonText: "OK",
        });
      }
    });
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
