import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post('/api/posts', { title, content, categories });
            alert('Post created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <label>Content:</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} />
                <label>Categories:</label>
                <select multiple value={categories} onChange={e => setCategories(e.target.value)}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;
