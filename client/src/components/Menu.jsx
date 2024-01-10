import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
              <img src={`../upload/${post.img}`} alt="post cover" />
              <h2>{post.title}</h2>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
        ))}
      </div>
  );
};

export default Menu;
