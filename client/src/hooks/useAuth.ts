import { useEffect, useState } from "react";
import useAuthStore from "../stores/authState";
import axios from "axios";

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
  
  return {
    user,
    token,
    loading,
    error,
  }
}