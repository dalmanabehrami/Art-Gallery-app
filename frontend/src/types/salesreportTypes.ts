// salesReport.ts

export interface SalesReportCreateDto {
    startDate: Date; // Start date of the report
    endDate: Date; // End date of the report
    totalSales: number; // Total number of sales
    totalRevenue: number; // Total revenue
    topSellingArtistId: number; // ID of the top-selling artist
  }
  
  export interface SalesReportReadDto {
    id: number; // ID of the report
    startDate: Date; // Start date of the report
    endDate: Date; // End date of the report
    totalSales: number; // Total number of sales
    totalRevenue: number; // Total revenue
    topSellingArtistId: number; // ID of the top-selling artist
  }
  
  export interface SalesReportUpdateDto {
    id: number; // ID of the report to update
    startDate: Date; // Updated start date
    endDate: Date; // Updated end date
    totalSales: number; // Updated total number of sales
    totalRevenue: number; // Updated total revenue
    topSellingArtistId: number; // Updated ID of the top-selling artist
  }
  