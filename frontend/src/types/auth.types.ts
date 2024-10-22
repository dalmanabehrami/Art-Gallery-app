export interface IRegisterDto {
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    email: string;
    password: string;
    address: string;
  }
  
  export interface ILoginDto {
    userName: string;
    password: string;
  }
  
  export interface IUpdateRoleDto {
    userName: string;
    newRole: string;
  }
  
  export interface IUpdateDto {
    userName: string,
    email: string,
    password: string,
    address: string,
  }
  export interface IAuthUser {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    address: string;
    email: string;
    createdAt: string;
    roles: string[];
  }
  
  export interface ILoginResponseDto {
    newToken: string;
    userInfo: IAuthUser;
  }
  
  export interface IAuthContextState {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    user?: IAuthUser;
  }
  
  export enum IAuthContextActionTypes {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
  }
  
  export interface IAuthContextAction {
    type: IAuthContextActionTypes;
    payload?: IAuthUser;
  }
  
  export interface IAuthContext {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    user?: IAuthUser;
    login: (userName: string, password: string) => Promise<void>;
    register: (
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      gender: string,
      password: string,
      address: string
    ) => Promise<void>;
    logout: () => void;
    update: (
      id: string,
      userName: string,
      email: string,
      password: string,
      address: string
    ) => Promise<void>; 
  }
  
  export enum RolesEnum {
    ADMIN = 'Admin',
    DOCTOR = 'Doctor',
    NURSE = 'Nurse',
    PATIENT = 'Patient',
    USER = 'User',
  }

  export enum GenderEnum {
    FEMALE = 'Female',
    MALE = 'Male',
  }