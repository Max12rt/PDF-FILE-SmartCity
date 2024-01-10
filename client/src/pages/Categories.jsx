import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);


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

    return (
        <div>
            <h2>All Categories  
            <Link to={`/categories/create`}>+</Link> 
            </h2>
            <table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  
    {categories.map((category) => (
        <tr>
                    <td key={category.id}> <Link to={`/categories/${category.id}`}>{category.title}</Link>  </td>
                    <td> {category.description}  </td>
        </tr>  
                ))}


  
</table>            
</div>
    );
};

export default Categories;
