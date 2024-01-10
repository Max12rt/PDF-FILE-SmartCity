// CategoryEdit.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// форма валідації правил
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const CategoryEdit = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  // ініціалізувати форму з react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // отримати категорію за id з api
  useEffect(() => {
    fetch(`/api/categories/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        // скинути значення форми з даними категорії
        reset(data);
      })
      .catch((error) => console.error("Error fetching category details:", error));
  }, [categoryId, reset]);

  // обробити відправку форми
  const onSubmit = (data) => {
    // оновити категорію з api
    fetch(`/api/categories/${categoryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // перейти до деталей категорії
        navigate(`/categories`);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  // обробити видалення категорії
  const onDelete = () => {
    // підтвердити дію користувача
    if (window.confirm(`Are you sure you want to delete ${category.title}?`)) {
      // видалити категорію з api
      fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // повідомити користувача про успіх
          alert(`Category ${category.title} deleted successfully.`);
          // перейти до списку категорій
          navigate("/categories");
        })
        .catch((error) => console.error("Error deleting category:", error));
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            {...register("title")}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            {...register("description")}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate(`/categories`)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
