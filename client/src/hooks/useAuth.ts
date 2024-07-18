import { useEffect, useState } from "react";
import useAuthStore from "../stores/authState";
import axios, { AxiosResponse } from "axios";

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
    clearUserAndToken();
    setError(errMessage);
    setLoading(false);
  }
  
  const _handleUserResponse = (response: AxiosResponse<any,any>) => {
    const {token, user } = response.data;
    setUserAndToken(user!, token!);
    localStorage.setItem("token", token);

    setError(null);
    setLoading(false);
  }
  
  const login = async (username: string, password: string) => {
    setLoading(true);
    const payload = {
      username,
      password
    };
    
    const response = await axios.post("http://localhost:3000/api/v1/auth/login/", payload).catch(res => _handleError(res.response.data.message));

    if ( response ) _handleUserResponse(response);    
  }
  
  const signUp = async (payload: SignUpData) => {
    setLoading(true);
    const response = await axios.post("http://localhost:3000/api/v1/auth/signup/", payload).catch(res => _handleError(res.response.data.message));

    if ( response ) _handleUserResponse(response); 
  }
  
  return {
    user,
    token,
    loading,
    error,
    login,
    signUp,
  }
}