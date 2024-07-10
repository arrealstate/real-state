import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Notification.css';

function Notification() {
  const [showNotification, setShowNotification] = useState(true);

//   // Function to hide the notification after 3 minutes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowNotification(false);
//     }, 180000); // 3 minutes in milliseconds

//     // Clear the timer when the component unmounts or the notification is hidden
//     return () => clearTimeout(timer);
//   }, []);

//   // Function to handle hiding the notification when clicking on the "x" button
//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

  return (
    <div className={`notification-container ${showNotification ? 'visible' : 'hidden'}`}>
      <div className="notification-content bg-ARcolors-300 text-ARcolors-900 rounded p-3 flex items-center">
       
        <p className="notification-text text-lg" >
        <Link to="/developer?id=6595af15358f56eaf4a37737" className='flex pr-4 items-center '>
        <strong  className=' px-3' > New Launch of Motorcity </strong> Discover exclusive Shoba Project . </Link>
        </p>
      </div>
    </div>
  );
}

export default Notification;
