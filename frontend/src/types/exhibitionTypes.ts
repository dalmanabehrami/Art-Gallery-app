// exhibition.ts

export interface ExhibitionCreateDto {
    title: string; // Title of the exhibition
    description: string; // Description of the exhibition
    startDate: Date; // Start date of the exhibition
    endDate: Date; // End date of the exhibition
    location: string; // Location of the exhibition
  }
  
  export interface ExhibitionDeleteDto {
    id: number; // ID of the exhibition to be deleted
  }
  
  export interface ExhibitionReadDto {
    id: number; // ID of the exhibition
    title: string; // Title of the exhibition
    description: string; // Description of the exhibition
    startDate: Date; // Start date of the exhibition
    endDate: Date; // End date of the exhibition
    location: string; // Location of the exhibition
  }
  
  export interface ExhibitionUpdateDto {
    title: string; // Updated title of the exhibition
    description: string; // Updated description of the exhibition
    startDate: Date; // Updated start date of the exhibition
    endDate: Date; // Updated end date of the exhibition
    location: string; // Updated location of the exhibition
  }
  