import React, { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ match }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post(`/api/posts/${match.params.post_id}/comments`, { content });
            alert('Comment created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={content} onChange={e => setContent(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateComment;
