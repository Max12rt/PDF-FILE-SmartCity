import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostCategories = ({ match }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/api/posts/${match.params.post_id}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, [match.params.post_id]);

    return (
        <div>
            <h2>Categories</h2>
            {categories.forEach(category => (
                <div key={category.id}>
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default PostCategories;
