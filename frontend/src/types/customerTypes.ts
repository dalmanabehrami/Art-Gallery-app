// customer.ts

export interface CustomerCreateDto {
    fullName: string; // Full name of the customer
    email: string; // Email address of the customer
    password: string; // Password for customer account
    phoneNumber: string; // Phone number of the customer
    address: string; // Address of the customer
  }
  
  export interface CustomerReadDto {
    id: number; // ID of the customer
    fullName: string; // Full name of the customer
    email: string; // Email address of the customer
    phoneNumber: string; // Phone number of the customer
    address: string; // Address of the customer
  }
  
  export interface CustomerUpdateDto {
    fullName: string; // Updated full name of the customer
    phoneNumber: string; // Updated phone number of the customer
    address: string; // Updated address of the customer
  }
  