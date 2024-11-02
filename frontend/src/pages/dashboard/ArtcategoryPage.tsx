import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/general/Button";
import { ArtCategoryReadDto } from "../../types/artcategoryTypes";
import { getArtCategories } from "../../services/artcategoryService";
import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FaListAlt } from 'react-icons/fa';

const ArtCategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [artCategories, setArtCategories] = useState<ArtCategoryReadDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtCategories = async () => {
            try {
                const categories = await getArtCategories();
                setArtCategories(categories);
            } catch (err) {
                console.error("Error fetching art categories:", err);
                setError("Failed to fetch art categories");
            }
        };

        fetchArtCategories();
    }, []);

    const handleAddCategory = () => {
        navigate('/dashboard/add-art-category');
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="pageTemplate2 bg-[#F0F4F8]">
            <PageAccessTemplate color='#3b3549' icon={FaListAlt} role='Admin' />

            <div className="container mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Art Categories</h2>
                    <Button 
                        label="Add Category" 
                        onClick={handleAddCategory} 
                        variant="primary" 
                        type="button" 
                        className="text-white bg-[#4A90E2] hover:bg-[#357ABD] mb-4"
                    />

                    {artCategories.length > 0 ? (
                        <ul className="list-disc pl-6 text-gray-700">
                            {artCategories.map(category => (
                                <li key={category.id} className="mb-2">
                                    {category.name} - {category.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700">No categories available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtCategoryPage;
