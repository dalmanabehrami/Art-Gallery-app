// visitor.ts

export interface VisitorCreateDto {
    firstName: string; // Visitor's first name
    lastName: string; // Visitor's last name
    email: string; // Visitor's email address
    phoneNumber: string; // Visitor's phone number
    exhibitionId: number; // ID of the exhibition the visitor is registering for
  }
  
  export interface VisitorDeleteDto {
    id: number; // ID of the visitor to be deleted
  }
  
  export interface VisitorReadDto {
    id: number; // ID of the visitor
    firstName: string; // Visitor's first name
    lastName: string; // Visitor's last name
    email: string; // Visitor's email address
    phoneNumber: string; // Visitor's phone number
    exhibitionId: number; // ID of the exhibition
    exhibitionTitle?: string; // Optional exhibition title for convenience
  }
  
  export interface VisitorUpdateDto {
    firstName: string; // Updated first name of the visitor
    lastName: string; // Updated last name of the visitor
    email: string; // Updated email address of the visitor
    phoneNumber: string; // Updated phone number of the visitor
    exhibitionId: number; // Updated ID of the exhibition
  }
  