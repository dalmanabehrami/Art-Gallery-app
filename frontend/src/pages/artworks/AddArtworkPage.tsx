import { useNavigate } from 'react-router-dom';
import { createArtwork } from '../../services/artworkService'; // Import korrekt për funksionin createArtwork
import ArtworkForm from '../../components/artworks/ArtworkForm';
import { ArtworkCreateDto } from '../../types/artworkTypes'; // Sigurohu që të importosh ArtworkCreateDto

const AddArtworkPage = () => {
    const navigate = useNavigate();

    // Funksioni për të shtuar një vepër arti të re
    const handleAddArtwork = async (values: ArtworkCreateDto) => {
        try {
            const newArtwork: ArtworkCreateDto = {
                title: values.title,
                description: values.description,
                artist: values.artist,
                price: values.price,
                imageUrl: values.imageUrl,
                yearCreated: values.yearCreated,
            };

            await createArtwork(newArtwork);
            navigate('/dashboard/artwork-list');
        } catch (error) {
            console.error('Failed to add artwork:', error);
            alert('Failed to add artwork. Please try again.');
        }
    };

    return (
        <div>
            <h1>Add New Artwork</h1>
            <ArtworkForm
                initialValues={{ title: '', description: '', artist: '', price: 0, imageUrl: '', yearCreated: new Date().getFullYear() }}
                onSubmit={handleAddArtwork}
                submitButtonText="Add Artwork"
            />
        </div>
    );
};

export default AddArtworkPage;


