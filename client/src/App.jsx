import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import StudInfo from './components/StudInfo';

<<<<<<< HEAD
function App() {
=======
import { Auth, Dashboard } from './pages'
import { ProtectedRoute } from './components'

const App = ( ) => {
>>>>>>> 32de049 (The second commit with a functioning authentication system)
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Router>
      <Routes>
<<<<<<< HEAD
        {/* Redirect from `/` to `/login` by default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-info" element={<StudInfo />} />
=======
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={ <Dashboard />} />
        </Route>
>>>>>>> 32de049 (The second commit with a functioning authentication system)
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
