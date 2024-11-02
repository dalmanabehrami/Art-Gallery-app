import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";
import { SalesReportCreateDto, SalesReportReadDto, SalesReportUpdateDto } from "../types/salesreportTypes";

// Create a new sales report
export const createSalesReport = async (salesReportDto: SalesReportCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/SalesReport', salesReportDto);
    toast.success("Sales report created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all sales reports
export const getAllSalesReports = async (): Promise<SalesReportReadDto[]> => {
  try {
    const response = await axiosInstance.get('/SalesReport');
    return response.data as SalesReportReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get a sales report by ID
export const getSalesReportById = async (id: number): Promise<SalesReportReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/SalesReport/${id}`);
    return response.data as SalesReportReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update a sales report
export const updateSalesReport = async (id: number, salesReportDto: SalesReportUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/SalesReport/${id}`, salesReportDto);
    toast.success("Sales report updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Handle Axios Errors
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(`API call failed with status ${error.response?.status}: ${error.response?.statusText}`);
    throw new Error(error.response?.statusText || 'API call failed');
  } else {
    console.error('Unknown error occurred during Axios fetch');
    throw new Error('Unknown error occurred during Axios fetch');
  }
};
