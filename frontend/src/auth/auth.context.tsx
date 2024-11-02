import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.types";
import { getSession, setSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
  UPDATE_URL,
} from "../utils/globalConfig";

// Reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  switch (action.type) {
    case IAuthContextActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: action.payload,
      };
    case IAuthContextActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        user: undefined,
      };
    default:
      return state;
  }
};

// Initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

// Context and export
export const AuthContext = createContext<IAuthContext | null>(null);

// Interface for context props
interface IProps {
  children: ReactNode;
}

// Component to manage all auth functionalities and export
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  // Initialize Method
  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      console.log("Token from initializeAuthContext:", token); // Log for token

      if (token) {
        // Server request to validate token
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        
        const { newToken, userInfo } = response.data;
        console.log("New token after validation:", newToken); // Log for new token
        console.log("User info after validation:", userInfo); // Log for user info

        // Update state and save token
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      console.error("Error during auth context initialization:", error);
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  // Run initializeAuthContext at app start to verify authentication status
  useEffect(() => {
    console.log("Starting AuthContext Initialization");
    initializeAuthContext()
      .then(() => console.log("initializeAuthContext successful"))
      .catch((error) => console.log("initializeAuthContext error:", error));
  }, [initializeAuthContext]);

  // Register Method
  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      gender: string,
      password: string,
      address: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        gender,
        password,
        address,
      });
      console.log("Register result:", response);
      toast.success("Registration successful. Please log in.");
      navigate(PATH_AFTER_REGISTER);
    },
    [navigate]
  );

  // Update Method
  const update = useCallback(
    async (
      id: string,
      userName: string,
      email: string,
      password: string,
      address: string
    ) => {
      try {
        const response = await axiosInstance.put(`${UPDATE_URL}${id}`, {
          userName,
          email,
          password,
          address,
        });
        toast.success("Update successful");

        const { newToken, userInfo } = response.data;
        console.log("New token after update:", newToken);
        console.log("Updated user info:", userInfo);

        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });

        navigate("/dashboard/profile");
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Update failed. Please try again.");
      }
    },
    [navigate]
  );

  // Login Method
  const login = useCallback(
    async (userName: string, password: string) => {
      const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
        userName,
        password,
      });
      toast.success("Login successful");

      const { newToken, userInfo } = response.data;
      setSession(newToken);
      dispatch({
        type: IAuthContextActionTypes.LOGIN,
        payload: userInfo,
      });
      navigate(PATH_AFTER_LOGIN);
    },
    [navigate]
  );

  // Logout Method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, [navigate]);

  // Object for context provider values
  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    update,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valuesObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
