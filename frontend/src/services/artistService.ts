import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import { ArtistCreateDto, ArtistUpdateDto, ArtistReadDto } from '../types/artistTypes'; // Import necessary types
import { GeneralServiceResponseDto } from "../types/generalTypes"; // Import general service response type
import toast from "react-hot-toast";
import axios from "axios";

// Get all artists
export const getArtists = async (): Promise<ArtistReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Artist');
    return response.data as ArtistReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get artist by ID
export const getArtistById = async (id: number): Promise<ArtistReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Artist/${id}`);
    return response.data as ArtistReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Create a new artist
export const createArtist = async (artistDto: ArtistCreateDto): Promise<GeneralServiceResponseDto> => {
  try {
    const response = await axiosInstance.post('/Artist', artistDto);
    toast.success("Artist created successfully.");
    return response.data as GeneralServiceResponseDto;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Update an artist
export const updateArtist = async (id: number, artistDto: ArtistUpdateDto): Promise<GeneralServiceResponseDto> => {
  try {
    const response = await axiosInstance.put(`/Artist/${id}`, artistDto);
    toast.success("Artist updated successfully.");
    return response.data as GeneralServiceResponseDto;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete an artist
export const deleteArtist = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Artist/${id}`);
    toast.success("Artist deleted successfully.");
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
