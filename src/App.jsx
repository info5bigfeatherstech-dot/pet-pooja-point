// src/App.jsx - Application root with React Router configuration
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthModal from "./components/auth/AuthModal"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Wildcard redirect to home; ready for future routes like /restaurant/:id */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Zepto-inspired Indian Phone Login Modal Popup */}
      <AuthModal />
    </BrowserRouter>
  )
}

export default App
