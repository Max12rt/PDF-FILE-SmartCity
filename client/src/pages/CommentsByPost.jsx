import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsByPost = ({ match }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/posts/${match.params.post_id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, [match.params.post_id]);

    return (
        <div>
            <h2>Comments</h2>
            {comments.forEach(comment => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentsByPost;
