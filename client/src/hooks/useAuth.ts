import { useEffect, useState } from "react";
import useAuthStore from "../stores/authState";
import axios from "axios";

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
      console.log("Token Recieve: ", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const payload = {
      username,
      password
    };

    const response = await axios.post("http://localhost:3000/api/v1/auth/login/", payload);
    
    if ( response.status !== 200 ) {
      // Do Something about the error
      clearUserAndToken();
      return;
    }

    const {token, user } = response.data;
    setUserAndToken(user!, token!);
    localStorage.setItem("token", token);
  }
  
  const signUp = async (payload: SignUpData) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/signup/", payload);
    
    if ( response.status !== 200 ) {
      // Do Something about the error
      clearUserAndToken();
      return;
    }
    
    const {token, user} = response.data;
    setUserAndToken(user!, token!);
    localStorage.setItem("token", token);
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