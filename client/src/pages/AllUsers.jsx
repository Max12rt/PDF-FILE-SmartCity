import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    console.log("1");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/');
                console.log(response);
                setUsers(response.data.rows);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {users.forEach((user) => (
                        <li key={user.id}>
                            {user.login}
                            {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUsers;
