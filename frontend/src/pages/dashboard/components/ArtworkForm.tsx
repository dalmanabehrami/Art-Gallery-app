import React, { useState, useEffect } from 'react';
import { ArtworkCreateDto, ArtworkReadDto } from '../../../types/artworkTypes';

interface Props {
  onCreate: (artwork: ArtworkCreateDto) => void;
  onUpdate: (id: number, artwork: ArtworkCreateDto) => void;
  selectedArtwork: ArtworkReadDto | null;
  clearSelection: () => void;
}

const ArtworkForm: React.FC<Props> = ({ onCreate, onUpdate, selectedArtwork, clearSelection }) => {
  const [artworkData, setArtworkData] = useState<ArtworkCreateDto>({
    title: '',
    description: '',
    artist: '',
    imageUrl: '',
    yearCreated: new Date().getFullYear(),
    price: 0,
  });

  useEffect(() => {
    if (selectedArtwork) {
      setArtworkData({
        title: selectedArtwork.title,
        description: selectedArtwork.description,
        artist: selectedArtwork.artist,
        imageUrl: selectedArtwork.imageUrl,
        yearCreated: selectedArtwork.yearCreated,
        price: selectedArtwork.price,
      });
    }
  }, [selectedArtwork]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedArtwork) {
      onUpdate(selectedArtwork.id, artworkData);
    } else {
      onCreate(artworkData);
    }
    setArtworkData({
      title: '',
      description: '',
      artist: '',
      imageUrl: '',
      yearCreated: new Date().getFullYear(),
      price: 0,
    });
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={artworkData.title} 
        onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={artworkData.description} 
        onChange={(e) => setArtworkData({ ...artworkData, description: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Artist" 
        value={artworkData.artist} 
        onChange={(e) => setArtworkData({ ...artworkData, artist: e.target.value })} 
        required 
      />
      <input 
        type="url" 
        placeholder="Image URL" 
        value={artworkData.imageUrl} 
        onChange={(e) => setArtworkData({ ...artworkData, imageUrl: e.target.value })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Year Created" 
        value={artworkData.yearCreated} 
        onChange={(e) => setArtworkData({ ...artworkData, yearCreated: parseInt(e.target.value, 10) })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={artworkData.price} 
        onChange={(e) => setArtworkData({ ...artworkData, price: parseFloat(e.target.value) })} 
        required 
      />
      <button type="submit">{selectedArtwork ? 'Update Artwork' : 'Create Artwork'}</button>
    </form>
  );
};

export default ArtworkForm;
