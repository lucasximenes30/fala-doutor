import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 w-full flex justify-center">
      <App />
    </div>
  </StrictMode>,
)