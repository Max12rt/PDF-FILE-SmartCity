// UpdateUser.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        // Fetch user details when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/updateUser/${userId}`, formData);
            // Add any additional handling or redirection logic after successful submission
        } catch (error) {
            console.error(error);
            // Add error handling logic
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name || user.full_name}
                        onChange={handleChange}
                    />

                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} />

                    <label>Role:</label>
                    <input type="text" name="role" value={formData.role || user.role} onChange={handleChange} />

                    <button type="submit">Update User</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateUser;
