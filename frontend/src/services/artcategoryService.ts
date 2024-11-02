import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import { GeneralServiceResponseDto } from "../types/generalTypes"; // Import necessary types
import toast from "react-hot-toast";
import axios from "axios";
import { ArtCategoryReadDto, ArtCategoryCreateDto, ArtCategoryUpdateDto } from "../types/artcategoryTypes";

// Get all art categories
export const getArtCategories = async (): Promise<ArtCategoryReadDto[]> => {
  try {
    const response = await axiosInstance.get('/ArtCategory');
    return response.data as ArtCategoryReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get art category by ID
export const getArtCategoryById = async (id: number): Promise<ArtCategoryReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/ArtCategory/${id}`);
    return response.data as ArtCategoryReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Create a new art category
export const createArtCategory = async (artCategoryDto: ArtCategoryCreateDto): Promise<GeneralServiceResponseDto> => {
  try {
    const response = await axiosInstance.post('/ArtCategory', artCategoryDto);
    toast.success("Art category created successfully.");
    return response.data as GeneralServiceResponseDto;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Update an art category
export const updateArtCategory = async (id: number, artCategoryDto: ArtCategoryUpdateDto): Promise<GeneralServiceResponseDto> => {
  try {
    const response = await axiosInstance.put(`/ArtCategory/${id}`, artCategoryDto);
    toast.success("Art category updated successfully.");
    return response.data as GeneralServiceResponseDto;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete an art category
import { AxiosError } from 'axios'; // Import AxiosError

// Delete an art category
export const deleteArtCategory = async (id: number): Promise<GeneralServiceResponseDto> => {
  try {
    await axiosInstance.delete(`/ArtCategory/${id}`);
    toast.success("Art category deleted successfully.");
    return { isSucceed: true, statusCode: 200, message: "Category deleted successfully." }; // Return a success response
  } catch (error) {
    handleError(error);
    
    // Cast error to AxiosError
    const axiosError = error as AxiosError; 
    return { 
      isSucceed: false, 
      statusCode: axiosError.response?.status || 500, 
      message: axiosError.message || 'An unknown error occurred' 
    }; // Return an error response
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
