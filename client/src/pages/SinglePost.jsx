import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePost = ({ match }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${match.params.post_id}`);
                setPost(response.data.post);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [match.params.post_id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
};

export default SinglePost;
