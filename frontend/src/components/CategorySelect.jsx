import React, { useState, useEffect } from "react";
import { getCategories } from '../services/categoryService';

export default function CategorySelect({ value, onChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    return (
        <select name="category_id" value={value} onChange={onChange}>
            <option value="">Seleccionar Categoría</option>
            {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
            ))}
        </select>
    );
}