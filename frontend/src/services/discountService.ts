import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import {
  DiscountCreateDto,
  DiscountReadDto,
  DiscountUpdateDto,
} from '../types/discountTypes'; // Import necessary types
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";

// Create a new discount
export const createDiscount = async (discountDto: DiscountCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/Discount', discountDto);
    toast.success("Discount created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all discounts
export const getAllDiscounts = async (): Promise<DiscountReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Discount');
    return response.data as DiscountReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get a discount by ID
export const getDiscountById = async (id: number): Promise<DiscountReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Discount/${id}`);
    return response.data as DiscountReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update a discount
export const updateDiscount = async (id: number, discountDto: DiscountUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Discount/${id}`, discountDto);
    toast.success("Discount updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete a discount
export const deleteDiscount = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Discount/${id}`);
    toast.success("Discount deleted successfully.");
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
