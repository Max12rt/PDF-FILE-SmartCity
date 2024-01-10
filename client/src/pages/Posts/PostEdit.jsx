import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// форма валідації правил
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

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
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        reset(data.post);
      })
      .catch((error) => console.error("Error fetching post details:", error));
  }, [postId, reset]);

  // обробити відправку форми
  const onSubmit = (data) => {
    // оновити категорію з api
    fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // перейти до деталей категорії
        navigate(`/posts`);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  // обробити видалення категорії
  const onDelete = () => {
    // підтвердити дію користувача
    if (window.confirm(`Are you sure you want to delete ${post.title}?`)) {
      // видалити категорію з api
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // повідомити користувача про успіх
          alert(`Post ${post.title} deleted successfully.`);
          // перейти до списку категорій
          navigate("/posts");
        })
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  if (!post) {
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
          <label>Content</label>
          <textarea
            name="content"
            {...register("content")}
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.content?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate(`/posts`)}
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

export default PostEdit;
