import { useState } from 'react'
import './AdminApp.css'
import Sidebar from './AdminSidebar'
import Home from './AdminHome'
import Header from '../admin/AdminHeader';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  // false
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default App
