import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import artworkService from '../../services/artworkService';
import ArtworkForm from '../../components/artworks/ArtworkForm';
import { ArtworkCreateDto, ArtworkReadDto } from '../../types/artworkTypes';

const EditArtworkPage = () => {
    const { id } = useParams<{ id: string }>();
    const [artwork, setArtwork] = useState<ArtworkReadDto | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await artworkService.getArtworkById(Number(id));
                setArtwork(response);
            } catch (error) {
                console.error('Failed to fetch artwork:', error);
            }
        };

        fetchArtwork();
    }, [id]);

    const handleUpdateArtwork = async (values: ArtworkCreateDto) => {
        try {
            await artworkService.updateArtwork(Number(id), values);
            navigate('/dashboard/artwork-list');
        } catch (error) {
            console.error('Failed to update artwork:', error);
            alert('Failed to update artwork. Please try again.');
        }
    };

    return (
        <div>
            <h1>Edit Artwork</h1>
            {artwork ? (
                <ArtworkForm
                    initialValues={{
                        title: artwork.title,
                        description: artwork.description,
                        artist: artwork.artist,
                        price: artwork.price,
                        imageUrl: artwork.imageUrl,
                        yearCreated: artwork.yearCreated, // Shtoni fushën 'yearCreated'
                    }}
                    onSubmit={handleUpdateArtwork}
                    submitButtonText="Save Changes"
                />
            ) : (
                <p>Loading artwork data...</p>
            )}
        </div>
    );
};

export default EditArtworkPage;
