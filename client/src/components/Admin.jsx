import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import Sidebar from './Sidebar';
import App from '../admin/AdminApp';
import Header from '../admin/AdminHeader';
import Listing from '../../../api/models/listing.model'; 

export default function Admin() {
  return (
    <main>
      <App />
   
    </main>
  );
}
