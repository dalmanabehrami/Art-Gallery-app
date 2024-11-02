import axiosInstance from "../utils/axiosInstance"; // Sigurohuni që axiosInstance është importuar siç duhet
import { ArtworkCreateDto, ArtworkReadDto } from '../types/artworkTypes'; // Importoni llojet e nevojshme
import toast from "react-hot-toast";
import axios from "axios";

// Krijoni një vepër arti
export const createArtwork = async (artworkDto: ArtworkCreateDto): Promise<ArtworkReadDto> => {
  try {
    const response = await axiosInstance.post('/Artwork', artworkDto);
    toast.success("Artwork created successfully.");
    return response.data as ArtworkReadDto;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Merrni të gjitha veprat e artit
export const getArtworks = async (): Promise<ArtworkReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Artwork');
    return response.data as ArtworkReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Kthe një array të zbrazët në rast të një gabimi
  }
};

// Merrni veprën e artit me ID
export const getArtworkById = async (id: number): Promise<ArtworkReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Artwork/${id}`);
    return response.data as ArtworkReadDto;
  } catch (error) {
    handleError(error);
    return null; // Kthe null në rast të një gabimi
  }
};

// Përditësoni një vepër arti
export const updateArtwork = async (id: number, artworkDto: ArtworkCreateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Artwork/${id}`, artworkDto);
    toast.success("Artwork updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Fshini një vepër arti
export const deleteArtwork = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Artwork/${id}`);
    toast.success("Artwork deleted successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Menaxho gabimet e Axios
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(`API call failed with status ${error.response?.status}: ${error.response?.statusText}`);
    toast.error(error.response?.statusText || 'API call failed'); // Shto një mesazh gabimi
    throw new Error(error.response?.statusText || 'API call failed');
  } else {
    console.error('Unknown error occurred during Axios fetch');
    toast.error('Unknown error occurred during Axios fetch'); // Shto një mesazh gabimi
    throw new Error('Unknown error occurred during Axios fetch');
  }
};

// Eksportoni funksionet si një objekt me eksport të paracaktuar
export default {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
};

