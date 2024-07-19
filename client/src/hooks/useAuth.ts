import { useEffect, useState } from "react";
import useAuthStore from "../stores/authState";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export interface SignUpData {
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  password: string;
}

export default function useAuth() {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const { user, token, clearUserAndToken, setUserAndToken } = useAuthStore(); 

  useEffect(() => {
    if ( token ) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token]);

  const _handleError = (errMessage: string) => {
    setError(errMessage);
    clearUserAndToken();
    setLoading(false);
    toast.error(errMessage, {id: "auth"})
  }
  
  const _handleUserResponse = (response: AxiosResponse<any,any>) => {
    setError(null);
    setLoading(false);

    const {token, user } = response.data;
    setUserAndToken(user!, token!);
    localStorage.setItem("token", token);
    toast.success("Signed in!", {id: "auth"})
  }
  
  const login = async (username: string, password: string) => {
    setLoading(true);
    toast.loading("Signing in!", {id: "auth"})
    const payload = {
      username,
      password
    };
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login/`, payload).catch(res => _handleError(res.response.data.message));

    if ( response ) _handleUserResponse(response);    
  }
  
  const signUp = async (payload: SignUpData) => {
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/signup/`, payload).catch(res => _handleError(res.response.data.message));

    if ( response ) _handleUserResponse(response); 
  }

  const logout = () => {
    clearUserAndToken();
    localStorage.removeItem("token");
    toast.success("Logged out");
  }
  
  return {
    user,
    token,
    loading,
    error,
    login,
    signUp,
    logout,
  }
}