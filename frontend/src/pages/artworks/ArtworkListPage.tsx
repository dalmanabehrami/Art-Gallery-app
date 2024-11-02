// ArtworkListPage.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as artworkService from '../../services/artworkService'; // Import artworkService correctly
import { ArtworkReadDto } from '../../types/artworkTypes'; // Make sure the types are correctly imported
import toast from 'react-hot-toast';

const ArtworkListPage = () => {
    const [artworks, setArtworks] = useState<ArtworkReadDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch artworks from the backend
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await artworkService.getArtworks();
                setArtworks(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
                toast.error('Failed to load artworks.');
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    // Handle the deletion of an artwork
    const handleDelete = async (id: number) => {
        try {
            await artworkService.deleteArtwork(id);
            setArtworks(artworks.filter((artwork) => artwork.id !== id));
            toast.success('Artwork deleted successfully.');
        } catch (error) {
            console.error('Failed to delete artwork:', error);
            toast.error('Failed to delete artwork.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Artwork List</h1>
            <Link to="/dashboard/add-artwork">Add New Artwork</Link>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {artworks.map((artwork) => (
                        <tr key={artwork.id}>
                            <td>{artwork.title}</td>
                            <td>{artwork.artist}</td>
                            <td>${artwork.price}</td>
                            <td>
                                <Link to={`/dashboard/edit-artwork/${artwork.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(artwork.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtworkListPage;
