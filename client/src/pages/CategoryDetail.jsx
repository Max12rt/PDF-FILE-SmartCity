import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


const CategoryDetail = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetch(`/api/categories/${categoryId}`)
            .then((response) => response.json())
            .then((data) => setCategory(data))
            .catch((error) => console.error('Error fetching category details:', error));
    }, [categoryId]);

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <p><Link to={`/categories/${categoryId}/edit`}>Edit</Link></p>
        </div>
    );
};

export default CategoryDetail;
