import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import {
  CustomerCreateDto,
  CustomerReadDto,
  CustomerUpdateDto,
} from '../types/customerTypes'; // Import necessary types
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";

// Register a new customer
export const registerCustomer = async (customerDto: CustomerCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/Customer', customerDto);
    toast.success("Customer registered successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all customers
export const getAllCustomers = async (): Promise<CustomerReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Customer');
    return response.data as CustomerReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get a customer by ID
export const getCustomerById = async (id: number): Promise<CustomerReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Customer/${id}`);
    return response.data as CustomerReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update a customer
export const updateCustomer = async (id: number, customerDto: CustomerUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Customer/${id}`, customerDto);
    toast.success("Customer updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete a customer
export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Customer/${id}`);
    toast.success("Customer deleted successfully.");
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
