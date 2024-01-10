import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePost = ({ match }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${match.params.post_id}`);
                setTitle(response.data.post.title);
                setContent(response.data.post.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [match.params.post_id]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.patch(`/api/posts/${match.params.post_id}`, { title, content });
            alert('Post updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Update Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <label>Content:</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UpdatePost;
