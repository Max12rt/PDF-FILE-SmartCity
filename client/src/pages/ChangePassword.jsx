import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
    const { confirmToken } = useParams();
    const [resetPassword, setResetPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resetPasswordHandler = async () => {
        try {
            setLoading(true);

            if (resetPassword !== confirmPassword) {
                setServerMessage('Passwords do not match');
                return;
            }

            const response = await fetch(`http://localhost:3000/api/auth/resetPassword/${confirmToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: resetPassword }),
            });

            if (response.ok) {
                const data = await response.json();
                setServerMessage(data.message);
                navigate('/manager');
            } else {
                const errorData = await response.json();
                setServerMessage(errorData.message || 'Failed to reset password');
            }
        } catch (error) {
            setServerMessage('Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="reset-password">
                <h2>Change Password</h2>
                <label>New Password:</label>
                <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={resetPasswordHandler} disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                {serverMessage && <p>{serverMessage}</p>}
            </div>
        </div>
    );
};

export default ChangePassword;
