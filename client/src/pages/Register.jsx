import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../style.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    full_name: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      // Redirect to login page or show a success message
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
              type="text"
              placeholder="Username"
              name="login"
              value={formData.login}
              onChange={handleChange}
          />
          <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
          />
          <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
          />
          <input
              type="text"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        {error && <p>{error}</p>}
      </div>
  );
};

export default Register;
