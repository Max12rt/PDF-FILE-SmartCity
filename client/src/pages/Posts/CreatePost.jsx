import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const CreatePost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoriesSelect, setCategoriesSelect] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        let options = event.target.selectedOptions;
        let ids = Array.from(options).map((option) => option.value);
        setCategoriesSelect(ids);
      };

    const handleSubmit = async e => {
        e.preventDefault();

  try {
    await axios.post('/api/posts', { title, content, categoriesSelect }); // додати categories тут
    alert('Post created successfully!');
    navigate(`/posts`);
  } catch (error) {
    console.error(error);
  }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} >
            <table>
            <tr>
                <td><label>Title:</label></td>
                <td><input type="text" value={title} onChange={e => setTitle(e.target.value)} /></td>
                </tr>
                <tr>
                <td><label>Content:</label></td>
                <td><textarea value={content} onChange={e => setContent(e.target.value)} /></td>
                </tr>
                <tr>
                <td><label>Categories:</label></td>
                <td><select multiple onChange={handleChange} >
                    {categories.map(category => (
                        <option value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select></td>  </tr>
                <tr><td></td><td><button type="submit">Submit</button></td>  </tr>
                </table>
            </form>
        </div>
    );
};

export default CreatePost;
