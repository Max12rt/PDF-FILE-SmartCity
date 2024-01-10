import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resetEmail, setResetEmail] = useState('');
    const [serverMessage, setServerMessage] = useState('');

    const getAccessToken = async () => {
        try {
            const response = await fetch('/api/auth/refresh_token', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setServerMessage(`New access token: ${data.access_token}`);
            } else {
                setServerMessage('Failed to get access token');
            }
        } catch (error) {
            setServerMessage('Error getting access token');
        }
    };

    const initiatePasswordReset = async () => {
        try {
            const response = await fetch('/api/auth/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: resetEmail }),
            });

            if (response.ok) {
                const data = await response.json();
                setServerMessage(data.message);
            } else {
                setServerMessage('Failed to initiate password reset');
            }
        } catch (error) {
            setServerMessage('Error initiating password reset');
        }
    };


    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                const response = await axios.get('/api/user/account');
                setUser(response.data);
            } catch (error) {
                setServerMessage('Error fetching user account');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAccount();
    }, []);

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('/api/user/create', {
                login: 'newuser',
                email: 'newuser@example.com',
                password: 'password123',
                full_name: 'New User',
            });
            setServerMessage(response.data.message);
        } catch (error) {
            setServerMessage('Error creating user');
        }
    };

    const handleChangeAvatar = async () => {
        try {
            const response = await axios.post('/api/user/change-avatar', {
                // Include necessary data for changing the avatar
            });
            setServerMessage(response.data.message);
        } catch (error) {
            setServerMessage('Error changing avatar');
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`/api/user/update/${user.id}`, {
                full_name: 'Updated Name',
                // Include other fields to update
            });
            setServerMessage(response.data.message);
        } catch (error) {
            setServerMessage('Error updating user');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`/api/user/delete/${user.id}`);
            setServerMessage(response.data.message);
            // Optionally, you can handle the logout or redirect the user after deleting the account
        } catch (error) {
            setServerMessage('Error deleting user');
        }
    };

    return (
        <div>
            <h1>Account Management</h1>
            <div className="account-management">
                <h1>Account Management</h1>
                <p>Welcome, {user ? user.username : 'Guest'}!</p>

                <button onClick={getAccessToken}>Refresh Access Token</button>

                <div className="reset-password">
                    <h2>Reset Password</h2>
                    <label>Email:</label>
                    <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                    <button onClick={initiatePasswordReset}>Submit</button>
                </div>

                {serverMessage && <p>{serverMessage}</p>}
            </div>
            {loading && <p>Loading...</p>}
            {user && (
                <div>
                    <p>Login: {user.login}</p>
                    <p>Email: {user.email}</p>
                    <p>Full Name: {user.full_name}</p>
                    {/* Add other user details as needed */}
                    <button onClick={handleCreateUser}>Create New User</button>
                    <button onClick={handleChangeAvatar}>Change Avatar</button>
                    <button onClick={handleUpdateUser}>Update User Information</button>
                    <button onClick={handleDeleteUser}>Delete Account</button>
                </div>
            )}
        </div>
    );
};

export default AccountManagement;
