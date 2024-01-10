// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/');
                setUsers(response.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>All user</h2>
            {users.forEach(user => (
                <div key={user.id}>
                    <h3>{user.login}</h3>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                </div>
            ))}
        </div>);
};

export default UserList;
