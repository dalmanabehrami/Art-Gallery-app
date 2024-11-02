import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";
import { VisitorStatisticsCreateDto, VisitorStatisticsReadDto, VisitorStatisticsUpdateDto } from "../types/visitorstatisticsTypes";

// Create visitor statistics
export const createVisitorStatistics = async (statisticsDto: VisitorStatisticsCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/VisitorStatistics', statisticsDto);
    toast.success("Visitor statistics created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all visitor statistics
export const getAllVisitorStatistics = async (): Promise<VisitorStatisticsReadDto[]> => {
  try {
    const response = await axiosInstance.get('/VisitorStatistics');
    return response.data as VisitorStatisticsReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get visitor statistics by ID
export const getVisitorStatisticsById = async (id: number): Promise<VisitorStatisticsReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/VisitorStatistics/${id}`);
    return response.data as VisitorStatisticsReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update visitor statistics
export const updateVisitorStatistics = async (id: number, statisticsDto: VisitorStatisticsUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/VisitorStatistics/${id}`, statisticsDto);
    toast.success("Visitor statistics updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete visitor statistics
export const deleteVisitorStatistics = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/VisitorStatistics/${id}`);
    toast.success("Visitor statistics deleted successfully.");
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
