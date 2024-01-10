import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Activation = () => {
    const { activation_token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/auth/activation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ activation_token }),
                });

                console.log(response.statusText, response.status);
                if (response.ok) {
                    const data = await response.json();

                    // Check if the message is 'Account has been activated.'
                    if (data.message === 'Account has been activated.') {
                        console.log(data.message);

                        // Redirect to the login page on success
                        navigate('/login');
                    } else {
                        // Handle other success messages if needed
                        console.log(data.message);
                    }
                } else {
                    // Handle non-OK responses (e.g., 404, 500)
                    console.error('Error activating account:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error activating account:', error);
                // Handle errors as needed
            }
        };

        activateAccount();
    }, [activation_token, navigate]);

    return (
        <div>
            <p>Activating your account...</p>
        </div>
    );
};

export default Activation;
