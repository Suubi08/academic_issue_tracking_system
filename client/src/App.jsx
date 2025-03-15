import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Auth, Dashboard } from './pages'
import { ProtectedRoute } from './components'

const App = ( ) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={ <Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;