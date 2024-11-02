// transaction.ts

export interface TransactionCreateDto {
    artworkId: number; // ID of the artwork being purchased
    customerId: number; // ID of the customer making the purchase
    amount: number; // Amount of the transaction
    transactionDate: Date; // Date of the transaction
    paymentMethod: string; // Payment method (e.g., Credit Card, PayPal)
  }
  
  export interface TransactionReadDto {
    id: number; // ID of the transaction
    artworkId: number; // ID of the artwork
    customerId: number; // ID of the customer
    amount: number; // Amount of the transaction
    transactionDate: Date; // Date of the transaction
    paymentMethod: string; // Payment method
    artworkTitle?: string; // Optional title of the artwork for convenience
    customerName?: string; // Optional name of the customer for convenience
  }
  
  export interface TransactionUpdateDto {
    amount: number; // Updated amount of the transaction
    customerId: number; // Updated customer ID
    artworkId: number; // Updated artwork ID
    // Add additional properties as needed
  }
  