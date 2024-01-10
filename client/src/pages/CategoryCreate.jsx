import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// форма валідації правил
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const CategoryCreate = () => {
  const navigate = useNavigate();

  // ініціалізувати форму з react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // обробити відправку форми
  const onSubmit = (data) => {
    // створити нову категорію з api
    fetch(`/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // перейти до деталей категорії
        navigate(`/categories`);
      })
      .catch((error) => console.error("Error creating category:", error));
  };

  return (
    <div>
      <h2>Create Category</h2>
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
          Create
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/categories")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;