import React from 'react'
import Sidebar from './dashboard/Sidebar'
import Navbar from './dashboard/Navbar'
import Dash from './dashboard/Dash'

function App2() {
  return (
    <div className='flex'>
      <Dash/>
      <Sidebar/>
      {/* <Navbar/>   */}
    </div>
  )
}

export default App2