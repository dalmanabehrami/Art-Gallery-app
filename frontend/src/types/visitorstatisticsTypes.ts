// visitorStatistics.ts

export interface VisitorStatisticsCreateDto {
    reportDate: Date; // Date of report generation
    exhibitionId: number; // Reference to the exhibition
    totalVisitors: number; // Total number of visitors
  }
  
  export interface VisitorStatisticsDeleteDto {
    id: number; // ID of the visitor statistics to be deleted
  }
  
  export interface VisitorStatisticsReadDto {
    id: number; // ID of the visitor statistics
    reportDate: Date; // Date of report generation
    exhibitionId: number; // Reference to the exhibition
    exhibitionTitle: string; // Title of the exhibition
    totalVisitors: number; // Total number of visitors
  }
  
  export interface VisitorStatisticsUpdateDto {
    reportDate: Date; // Date of report generation
    exhibitionId: number; // Reference to the exhibition
    totalVisitors: number; // Total number of visitors
  }
  