import { useState } from 'react'
import Sidebar from '../../../AdminSidebar'
import OffersDashboard from './OffersDashboard'
import Header from '../../../AdminHeader'



function OffersDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  // false
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <OffersDashboard />
    </div>
  )
}

export default OffersDash
