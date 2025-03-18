import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Auth, Dashboard } from './pages'
import { ProtectedRoute } from './components'
import Sidebar from './components/Sidebar'
import AllRoutes from './Routes/AllRoutes';

const App = ( ) => {
  return (
    <>
    <Sidebar/>
    <AllRoutes/>
    </>
    
  )
}

export default App;