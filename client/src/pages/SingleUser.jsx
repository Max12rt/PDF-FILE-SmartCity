import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data for the specified user ID
        const fetchUserById = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`); // Adjust the API endpoint
                const data = await response.json();
                setUser(data.user); // Assuming your API returns a 'user' property
            } catch (error) {
                console.error('Error fetching single user:', error);
            }
        };

        fetchUserById();
    }, [userId]);

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <h2>{user.login}</h2>
                    <p>{user.email}</p>
                    {/* Add more details or styling as needed */}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default SingleUser;
