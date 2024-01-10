import React, { useState } from 'react';
import axios from 'axios';

const CreateLike = ({ match }) => {
    const [likeType, setLikeType] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post(`/api/posts/${match.params.post_id}/like`, { likeType });
            alert('Like created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create Like</h2>
            <form onSubmit={handleSubmit}>
                <label>Type:</label>
                <select value={likeType} onChange={e => setLikeType(e.target.value)}>
                    <option value="like">Like</option>
                    <option value="dislike">Dislike</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLike;
