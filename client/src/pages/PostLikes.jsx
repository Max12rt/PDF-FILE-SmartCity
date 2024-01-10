import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostLikes = ({ match }) => {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`/api/posts/${match.params.post_id}/like`);
                setLikes(response.data.likes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikes();
    }, [match.params.post_id]);

    return (
        <div>
            <h2>Likes</h2>
            {likes.forEach(like => (
                <div key={like.id}>
                    <p>{like.type}</p>
                </div>
            ))}
        </div>
    );
};

export default PostLikes;
