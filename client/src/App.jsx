import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Auth, Dashboard } from './pages'
import { ProtectedRoute } from './components'
import Sidebar from './components/Sidebar'

const App = ( ) => {
  return (
    <>
    <Sidebar/>
    </>
    // <BrowserRouter>
   
    // </BrowserRouter>
  )
}

export default App;