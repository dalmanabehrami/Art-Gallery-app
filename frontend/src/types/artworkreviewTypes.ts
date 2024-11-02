// artworkReview.ts

export interface ArtworkReviewCreateDto {
  artworkId: number; // ID of the artwork
  userName: string; // Name of the user
  comment: string; // User's comment
  rating: number; // Rating (1-5)
}

export interface ArtworkReviewDeleteDto {
  id: number; // ID of the review to be deleted
}

export interface ArtworkReviewReadDto {
  id: number; // ID of the review
  artworkId: number; // ID of the artwork
  userName: string; // Name of the user
  comment: string; // User's comment
  rating: number; // Rating (1-5)
  createdAt: Date; // Date when the review was created
}

export interface ArtworkReviewUpdateDto {
  comment: string; // Updated comment from the user
  rating: number; // Updated rating (1-5)
}
