// artwork.ts

export interface ArtworkCreateDto {
  title: string; // Title of the artwork
  description: string; // Description of the artwork
  artist: string; // Artist of the artwork
  imageUrl: string; // URL of the artwork image
  yearCreated: number; // Year the artwork was created
  price: number; // Price of the artwork
}

export interface ArtworkReadDto {
  id: number; // ID of the artwork
  title: string; // Title of the artwork
  description: string; // Description of the artwork
  artist: string; // Artist of the artwork
  imageUrl: string; // URL of the artwork image
  yearCreated: number; // Year the artwork was created
  price: number; // Price of the artwork
  createdAt: Date; // Date when the artwork was created
}

