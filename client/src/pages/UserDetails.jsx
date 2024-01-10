// UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

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

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p>Login: {user.login}</p>
                    <p>Email: {user.email}</p>
                    <p>Full Name: {user.full_name}</p>
                    {/* Add more details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetails;
