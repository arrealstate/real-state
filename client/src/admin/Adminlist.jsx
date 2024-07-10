import React from 'react'
import Sidebar from './AdminSidebar'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import AdminListingItem from '../components/AdminListingItem';
import Header from './AdminHeader'

export default function Adminlist() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  // console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div  className= 'flex'>
      <div className= ''>     <Sidebar  />
        </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-3'>
      
         <main className=' col-span-2'>
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              {/* <Link className='text-sm text-blue-800 hover:underline' to={'/Admin/search?type=rent'}>Show more places for rent</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <AdminListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              {/* <Link className='text-sm text-blue-800 hover:underline' to={'/Admin/search?type=buy'}>Show more places for sale</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <AdminListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
