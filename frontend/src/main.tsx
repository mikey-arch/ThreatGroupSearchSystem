import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { BrowserRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import "leaflet/dist/leaflet.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <App />
        < Toaster/>
    </BrowserRouter>
  </StrictMode>,
)