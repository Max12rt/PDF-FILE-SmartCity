// CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        full_name: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/users/`, formData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Login:
                    <input type="text" name="login" onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleChange} />
                </label>
                <br />
                <label>
                    Full Name:
                    <input type="text" name="full_name" onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
