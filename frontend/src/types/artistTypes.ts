// artist.ts

export interface ArtistCreateDto {
  name: string; // Name of the artist
  biography: string; // Biography of the artist
  artStyle: string; // Art style of the artist
  profileImageUrl: string; // Profile image URL of the artist
}

export interface ArtistReadDto {
  id: number; // ID of the artist
  name: string; // Name of the artist
  biography: string; // Biography of the artist
  artStyle: string; // Art style of the artist
  profileImageUrl: string; // Profile image URL of the artist
  artworks: ArtworkReadDto[]; // List of artworks by the artist
}

export interface ArtistUpdateDto {
  name: string; // Name of the artist
  biography: string; // Biography of the artist
  artStyle: string; // Art style of the artist
  profileImageUrl: string; // Profile image URL of the artist
}

// Assuming you have an ArtworkReadDto similar to the backend
export interface ArtworkReadDto {
  id: number; // ID of the artwork
  title: string; // Title of the artwork
  description: string; // Description of the artwork
  artist: string; // Artist's name
  imageUrl: string; // URL of the artwork image
  yearCreated: number; // Year the artwork was created
  price: number; // Price of the artwork
}
