import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Adjust the path accordingly

const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      // Redirect to the desired page after successful login
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
          />
          <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
  );
};

export default Login;
