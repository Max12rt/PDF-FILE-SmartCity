import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = 'cf4c432caed77a0152a0d54d94ecae6d779072527d715477050693634123d982';
    console.log(accessToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/myAccount', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log('Raw response from server:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>My account</h2>
            <h3>{user.login}</h3>
            <p>{user.email}</p>
        </div>
    );
};

export default MyAccount;
