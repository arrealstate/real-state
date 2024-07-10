import React from 'react';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill , BsPlusSquare }
 from 'react-icons/bs';
 import {Link} from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand flex pr-4 items-center w-full'>
                <BsCart3  className='icon_header'/> AR
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item flex pr-4 items-center'>
                <Link to="/Admin" className='flex pr-4 items-center'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
            {/* /Properties */}
                <Link to="/Admin/search?searchTerm=&type=all&parking=false&furnished=false&offer=false&sort=createdAt&order=desc" className='flex pr-4 items-center'>
                    <BsFillArchiveFill className='icon'/> Properties
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Admin/Categories" className='flex pr-4 items-center'>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </ Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Admin/Users" className='flex pr-4 items-center'>
                    <BsPeopleFill className='icon'/> Users
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/Admin/list"} className='flex pr-4 items-center'>
                    <BsListCheck className='icon'/> list
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to ="/Admin/Reports" className='flex pr-4 items-center'>
                    <BsMenuButtonWideFill className='icon'/> Reports
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/color"
                
                // /Admin/Setting"
                
                className='flex pr-4 items-center'>
                    <BsFillGearFill className='icon'/> Setting
                </Link>
            </li>
            <li className='sidebar-list-item'>
          <Link to="/Admin/offer" className='flex pr-4 items-center'>
            <BsPlusSquare className='icon'/> Offer
          </Link>
        </li>
        </ul>
    </aside>
  )
}

export default Sidebar