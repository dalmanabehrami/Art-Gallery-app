import axiosInstance from "../utils/axiosInstance"; // Ensure axiosInstance is correctly imported
import {
  TransactionCreateDto,
  TransactionReadDto,
  TransactionUpdateDto,
} from '../types/transactionTypes'; // Import necessary types
import toast from "react-hot-toast"; // Import toast for notifications
import axios from "axios";

// Create a new transaction
export const createTransaction = async (transactionDto: TransactionCreateDto): Promise<void> => {
  try {
    await axiosInstance.post('/Transaction', transactionDto);
    toast.success("Transaction created successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Get all transactions
export const getAllTransactions = async (): Promise<TransactionReadDto[]> => {
  try {
    const response = await axiosInstance.get('/Transaction');
    return response.data as TransactionReadDto[];
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

// Get a transaction by ID
export const getTransactionById = async (id: number): Promise<TransactionReadDto | null> => {
  try {
    const response = await axiosInstance.get(`/Transaction/${id}`);
    return response.data as TransactionReadDto;
  } catch (error) {
    handleError(error);
    return null; // Return null in case of an error
  }
};

// Update a transaction
export const updateTransaction = async (id: number, transactionDto: TransactionUpdateDto): Promise<void> => {
  try {
    await axiosInstance.put(`/Transaction/${id}`, transactionDto);
    toast.success("Transaction updated successfully.");
  } catch (error) {
    handleError(error);
    throw error; // Rethrow the error after logging it
  }
};

// Delete a transaction
export const deleteTransaction = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Transaction/${id}`);
    toast.success("Transaction deleted successfully.");
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
