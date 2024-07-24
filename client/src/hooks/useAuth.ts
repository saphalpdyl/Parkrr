import { useEffect, useState } from "react";
import useAuthStore, { User } from "../stores/authStore.ts";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useGlobalStore from "@/stores/globalStore.ts";

export interface SignUpData {
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  password: string;
}

export default function useAuth() {
  const [ error, setError ] = useState<string | null>(null);

  const { user, token, clearUserAndToken, setUserAndToken } = useAuthStore();
  const { startAuthLoading, stopAuthLoading, stopEditorLoading, stopRendererLoading} = useGlobalStore();

  const _verifyToken = async (token: string) => {
    startAuthLoading();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/verify/`);
      setUserAndToken(response.data, token);
    } catch (e) {
      clearUserAndToken();
      localStorage.removeItem("token");
    } finally {
      // Other routes will stop Loading by themselves
      stopAuthLoading();
    }
  }

  useEffect(() => {
    if ( token ) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token]);
  
  useEffect(() => {
    if ( token ) {
      _verifyToken(token);
    }
  }, []);


  const _handleError = (errMessage: string) => {
    stopAuthLoading();
    console.error(errMessage);
    setError(errMessage);
    clearUserAndToken();
    toast.error(errMessage, {id: "auth"})
  }
  
  const _handleUserResponse = (response: AxiosResponse<{token: string, user: User}, never>) => {
    stopAuthLoading();
    setError(null);
    const { token, user }  = response.data;
    setUserAndToken(user!, token!);
    localStorage.setItem("token", token);
    toast.success("Signed in!", {id: "auth"})
  }
  
  const login = async (username: string, password: string) => {
    startAuthLoading();

    toast.loading("Signing in!", {id: "auth"})
    const payload = {
      username,
      password
    };

    await new Promise((resolve, _) => setTimeout(() => resolve("asdad"), 1000));
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login/`, payload).catch(error => _handleError(error.response?.data?.message || 'An unknown error occurred'));
    if (response) _handleUserResponse(response as never);
  }
  
  const signUp = async (payload: SignUpData) => {
    startAuthLoading();
    await new Promise((resolve, _) => setTimeout(() => resolve("asdad"), 1000));
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/signup/`, payload).catch(res => _handleError(res.response.data.message));

    if ( response ) _handleUserResponse(response as never);
  }

  const logout = () => {
    stopAuthLoading();
    stopRendererLoading();
    stopEditorLoading();

    clearUserAndToken();
    localStorage.removeItem("token");
    toast.success("Logged out");
  }
  
  return {
    user,
    token,
    error,
    login,
    signUp,
    logout,
  }
}