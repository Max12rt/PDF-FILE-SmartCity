// UpdateUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserById();
    }, [userId]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.patch(`/api/user/${userId}`, formData);
            // Optionally, redirect to user details or show a success message
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            {user && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name || user.full_name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Role:
                        <input
                            type="text"
                            name="role"
                            value={formData.role || user.role}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Update User</button>
                </form>
            )}
        </div>
    );
};

export default UpdateUser;
