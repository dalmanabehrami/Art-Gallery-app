import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import {
  VisitorCreateDto,
  VisitorReadDto,
  VisitorUpdateDto,
} from '../types/visitorTypes'; // Import necessary types
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";

// Register a new visitor
export const registerVisitor = async (visitorDto: VisitorCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/Visitor', visitorDto);
    toast.success("Visitor registered successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all visitors
export const getAllVisitors = async (): Promise<VisitorReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Visitor');
    return response.data as VisitorReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get a visitor by ID
export const getVisitorById = async (id: number): Promise<VisitorReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Visitor/${id}`);
    return response.data as VisitorReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update a visitor
export const updateVisitor = async (id: number, visitorDto: VisitorUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Visitor/${id}`, visitorDto);
    toast.success("Visitor updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete a visitor
export const deleteVisitor = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Visitor/${id}`);
    toast.success("Visitor deleted successfully.");
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
