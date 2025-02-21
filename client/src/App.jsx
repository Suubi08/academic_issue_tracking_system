import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Auth } from './pages'

const App = ( ) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;