import React, { useState } from 'react';
import { ArtworkCreateDto } from '../../types/artworkTypes';

type ArtworkFormProps = {
    initialValues: ArtworkCreateDto;
    onSubmit: (values: ArtworkCreateDto) => void | Promise<void>;
    submitButtonText: string;
};

const ArtworkForm: React.FC<ArtworkFormProps> = ({ initialValues, onSubmit, submitButtonText }) => {
    const [formData, setFormData] = useState<ArtworkCreateDto>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input name="artist" value={formData.artist} onChange={handleChange} placeholder="Artist" />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" />
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
            <input name="yearCreated" type="number" value={formData.yearCreated} onChange={handleChange} placeholder="Year Created" />
            <button type="submit">{submitButtonText}</button>
        </form>
    );
};

export default ArtworkForm;
