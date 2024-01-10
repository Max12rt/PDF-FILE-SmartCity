import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post data based on the id parameter
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`); // Adjust the API endpoint
        const data = await response.json();
        setPost(data.post); // Assuming your API returns a 'post' property
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  return (
      <div>
        <h1>Single Post</h1>
        {post ? (
            <div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Add more details or styling as needed */}
            </div>
        ) : (
            <p>Loading post...</p>
        )}
      </div>
  );
}

export default Single;
