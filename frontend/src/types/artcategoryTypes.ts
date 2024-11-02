// artCategory.ts

export interface ArtCategoryCreateDto {
  name: string; // Emri i kategorisë
  description: string; // Përshkrimi i kategorisë
}

export interface ArtCategoryDeleteDto {
  id: number; // ID e kategorisë që do të fshihet
}

export interface ArtCategoryReadDto {
  id: number; // ID e kategorisë
  name: string; // Emri i kategorisë
  description: string; // Përshkrimi i kategorisë
}

export interface ArtCategoryUpdateDto {
  name: string; // Emri i kategorisë
  description: string; // Përshkrimi i kategorisë
}
