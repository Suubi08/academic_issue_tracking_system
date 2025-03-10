import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import StudInfo from './components/StudInfo';

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Router>
      <Routes>
        {/* Redirect from `/` to `/login` by default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-info" element={<StudInfo />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
