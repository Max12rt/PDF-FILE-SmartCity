import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data.rows);
                const responseUser = await axios.get('/api/users');
                setUsers(responseUser.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>All Posts <Link to={`/posts/create`}>+</Link> </h2>
            {posts.map(post => (
                <div key={post.id}>
                    
                    <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
                    <p>{post.content}</p>
                    <p>{post.publishDate}</p>
                    <p>Autor : {users.find(x => x.id === post.author)?.full_name || "Unknown"}</p>
                    <br></br>
                </div>
                
            ))}
        </div>
        
        
    );
};

export default AllPosts;
