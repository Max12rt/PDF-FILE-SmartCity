import React, { useState } from 'react';
import axios from 'axios';

const ChangeAvatar = () => {
    const [avatar, setAvatar] = useState(null);
    const accessToken = 'cf4c432caed77a0152a0d54d94ecae6d779072527d715477050693634123d982';

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            const response = await axios.post('http://localhost:3000/api/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data);
            alert('Avatar updated successfully!');
        } catch (error) {
            console.error('Error changing avatar:', error);
            alert('An error occurred while changing the avatar.');
        }
    };

    return (
        <div>
            <h1>Change Avatar</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Avatar:
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Change Avatar</button>
            </form>
        </div>
    );
};

export default ChangeAvatar;
