import React from 'react';
import { ArtworkReadDto } from '../../../types/artworkTypes';

interface Props {
  artworks: ArtworkReadDto[];
  onDelete: (id: number) => void;
  onEdit: (artwork: ArtworkReadDto) => void;
}

const ArtworkList: React.FC<Props> = ({ artworks, onDelete, onEdit }) => {
  return (
    <div>
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <img src={artwork.imageUrl} alt={artwork.title} />
          <h3>{artwork.title}</h3>
          <p>{artwork.description}</p>
          <p>Artist: {artwork.artist}</p>
          <p>Price: ${artwork.price}</p>
          <button onClick={() => onEdit(artwork)}>Edit</button>
          <button onClick={() => onDelete(artwork.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
