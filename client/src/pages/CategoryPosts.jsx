import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPosts = () => {
    const { categoryId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/api/categories/${categoryId}/posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data.rows))
            .catch((error) => console.error('Error fetching category posts:', error));
    }, [categoryId]);

    return (
        <div>
            <h2>Posts in Category</h2>
            <ul>
                {posts.forEach((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPosts;
