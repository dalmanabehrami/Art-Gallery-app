import axios from "axios";
import { ArtworkReviewCreateDto, ArtworkReviewReadDto, ArtworkReviewUpdateDto } from "../types/artworkreviewTypes";
import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import toast from "react-hot-toast"; // Import toast for notifications

// Create a new artwork review
export const createArtworkReview = async (reviewDto: ArtworkReviewCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/ArtworkReview', reviewDto);
    toast.success("Artwork review created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all artwork reviews
export const getArtworkReviews = async (): Promise<ArtworkReviewReadDto[]> => {
  try {
    const response = await axiosInstance.get('/ArtworkReview');
    return response.data as ArtworkReviewReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get artwork review by ID
export const getArtworkReviewById = async (id: number): Promise<ArtworkReviewReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/ArtworkReview/${id}`);
    return response.data as ArtworkReviewReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update an artwork review
export const updateArtworkReview = async (id: number, reviewDto: ArtworkReviewUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/ArtworkReview/${id}`, reviewDto);
    toast.success("Artwork review updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete an artwork review
export const deleteArtworkReview = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/ArtworkReview/${id}`);
    toast.success("Artwork review deleted successfully.");
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
