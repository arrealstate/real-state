import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../AdminSidebar';

function OffersDashboard() {
  return (
    < >

    <div className='main-container mx-auto px-6 py-8'>
   
      <h1 className='text-4xl text-black font-semibold mb-8'>Offers Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Link to="/OfferAdminPanel" className="block p-6 bg-green-400 hover:bg-green-500 rounded-md">
          <button className='btn btn-primary text-xl mr-2'>Manage Offers</button>
        </Link>

        <Link to="/add-offers-to-listings" className="block p-6 bg-blue-400 hover:bg-blue-500 rounded-md">
          <button className='btn btn-primary text-xl mr-2'>Add Offers to Listings</button>
        </Link>

        <Link to="/send-offers-to-users" className="block p-6 bg-orange-400 hover:bg-orange-500 rounded-md">
          <button className='btn text-xl btn-primary'>Send Offers to Users</button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default OffersDashboard;
