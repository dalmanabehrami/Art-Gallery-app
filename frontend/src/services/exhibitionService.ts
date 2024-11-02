import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import {
  ExhibitionCreateDto,
  ExhibitionReadDto,
  ExhibitionUpdateDto,
} from '../types/exhibitionTypes'; // Import necessary types
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";

// Create a new exhibition
export const createExhibition = async (exhibitionDto: ExhibitionCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/Exhibition', exhibitionDto);
    toast.success("Exhibition created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all exhibitions
export const getAllExhibitions = async (): Promise<ExhibitionReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Exhibition');
    return response.data as ExhibitionReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get an exhibition by ID
export const getExhibitionById = async (id: number): Promise<ExhibitionReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Exhibition/${id}`);
    return response.data as ExhibitionReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update an exhibition
export const updateExhibition = async (id: number, exhibitionDto: ExhibitionUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Exhibition/${id}`, exhibitionDto);
    toast.success("Exhibition updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete an exhibition
export const deleteExhibition = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Exhibition/${id}`);
    toast.success("Exhibition deleted successfully.");
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
