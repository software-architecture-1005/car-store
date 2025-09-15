import React, { useState, useEffect } from 'react';
import { getMakes } from '../services/makeService';

export default function MakeSelect({ value, onChange }) {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        getMakes().then(setMakes).catch(console.error);
    }, []);

    return (
        <select name='make_id' value={value} onChange={onChange}>
            <option value="">Seleccionar Marca</option>
            {makes.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
            ))}
        </select>
    );
}