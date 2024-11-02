// discount.ts

export interface DiscountCreateDto {
    artworkId: number; // ID of the artwork
    discountPercentage: number; // Discount percentage (e.g., 10 for 10%)
    startDate: Date; // Start date of the discount
    endDate: Date; // End date of the discount
  }
  
  export interface DiscountReadDto {
    id: number; // ID of the discount
    artworkId: number; // ID of the artwork
    discountPercentage: number; // Discount percentage
    startDate: Date; // Start date of the discount
    endDate: Date; // End date of the discount
    artworkTitle?: string; // Optional title of the artwork for convenience
  }
  
  export interface DiscountUpdateDto {
    name: string; // Name of the discount
    percentage: number; // Updated discount percentage
    startDate: Date; // Updated start date
    endDate: Date; // Updated end date
  }
  