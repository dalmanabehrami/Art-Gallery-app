import React, { useEffect, useState } from 'react';
import { getArtworks, createArtwork, updateArtwork, deleteArtwork } from '../../services/artworkService';
import { ArtworkCreateDto, ArtworkReadDto } from '../../types/artworkTypes';
import ArtworkForm from './components/artworkForm';
import ArtworkList from './components/ArtworkList';

const ArtworksPage: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworkReadDto[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkReadDto | null>(null);

  useEffect(() => {
    // Fetch all artworks when the page loads
    const fetchArtworks = async () => {
      const data = await getArtworks();
      setArtworks(data);
    };
    fetchArtworks();
  }, []);

  // Function to handle artwork creation
  const handleCreate = async (artwork: ArtworkCreateDto) => {
    const newArtwork = await createArtwork(artwork);
    setArtworks([...artworks, newArtwork]);
  };

  // Function to handle artwork updates
  const handleUpdate = async (id: number, artwork: ArtworkCreateDto) => {
    await updateArtwork(id, artwork);
    setArtworks(artworks.map(a => (a.id === id ? { ...a, ...artwork } : a)));
  };

  // Function to handle artwork deletion
  const handleDelete = async (id: number) => {
    await deleteArtwork(id);
    setArtworks(artworks.filter(a => a.id !== id));
  };

  return (
    <div>
      <h2>Manage Artworks</h2>
      <ArtworkForm 
        onCreate={handleCreate} 
        onUpdate={handleUpdate} 
        selectedArtwork={selectedArtwork}
        clearSelection={() => setSelectedArtwork(null)} 
      />
      <ArtworkList 
        artworks={artworks} 
        onDelete={handleDelete} 
        onEdit={(artwork) => setSelectedArtwork(artwork)}
      />
    </div>
  );
};

export default ArtworksPage;
