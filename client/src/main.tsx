import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { Toaster as SonnerToaster } from "@/components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <SonnerToaster />
    <App />
  </React.StrictMode>,
)
