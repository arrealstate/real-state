import React from 'react';
import { FaYoutube, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaPinterest, FaSnapchat, FaTiktok, FaTelegram, FaTwitter } from 'react-icons/fa'; // Corrected import statement
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-ARcolors-200 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 px-4 mb-6 ARcolors-900">
          <h2 className="text-2xl ARcolors-900 font-bold mb-4">AR Real Estate</h2>
          <p>
            Explore AR Real Estate, your gateway to exquisite properties. From luxurious villas to elegant apartments, we offer a tailored real estate experience to help you find your dream home.
          </p>
          
        </div>
        <div className="w-full md:w-1/3 px-4 mb-6 ARcolors-900">
          <h2 className="text-2xl font-bold mb-4 ARcolors-900">Location</h2>
          <ul>
            <li>Country: United Arab Emirates </li>
            <li> City: Dubai </li>
            <li>Current Location: Dubai, Business Bay </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-6 ARcolors-900">
          <h2 className="text-2xl font-bold mb-4 ARcolors-900">Contacts</h2>
          <ul>
            <li>Phone:+971562929527</li>
            <li>Company: HYZ Investment L.L.C</li>            

{/* <div className="flex flex-wrap mt-4 w-full">
  <div className="flex justify-start w-full ">
    <a href="https://www.youtube.com/channel/UClIuZ3967zV4SsRveP4fvoQ" className="mr-4"><FaYoutube /></a>
    <a href="https://www.linkedin.com/in/ar-realstate/" className="mr-4"><FaLinkedin /></a>
    <a href="https://www.instagram.com/arrealstate/" className="mr-4"><FaInstagram /></a>

    <a href="https://api.whatsapp.com/send/?phone=971562929527" className="mr-4"><FaWhatsapp /></a>
    <a href="https://whatsapp.com/channel/0029VaQHfLH9sBI2tctAkf1i " className="mr-4"><FaWhatsapp /></a>

    <a href="https://www.pinterest.com/AR_RealState/" className="mr-4"><FaPinterest /></a>
    <a href="https://www.snapchat.com/add/ar_realstate?share_id=YjDIC5RZ6Dg&locale=ar-EG" className="mr-4"><FaSnapchat /></a>
    <a href="https://www.tiktok.com/@arrealstate" className="mr-4"><FaTiktok /></a>
    <a href="https://t.me/arrealstate" className="mr-4"><FaTelegram /></a>
    <a href="https://twitter.com/arrealstate" className="mr-4"><FaXTwitter /></a>
</div>
</div> */}


<div className="flex flex-wrap mt-4 w-full justify-start">
  <div className="grid grid-cols-10 gap-4">
    <a href="https://www.youtube.com/channel/UClIuZ3967zV4SsRveP4fvoQ"><FaYoutube /></a>
    <a href="https://www.linkedin.com/in/ar-realstate/"><FaLinkedin /></a>
    <a href="https://www.instagram.com/arrealstate/"><FaInstagram /></a>
    <a href="https://api.whatsapp.com/send/?phone=971562929527"><FaWhatsapp /></a>
    <a href="https://whatsapp.com/channel/0029VaQHfLH9sBI2tctAkf1i "><FaWhatsapp /></a>
    <a href="https://www.pinterest.com/AR_RealState/"><FaPinterest /></a>
    <a href="https://www.snapchat.com/add/ar_realstate?share_id=YjDIC5RZ6Dg&locale=ar-EG"><FaSnapchat /></a>
    <a href="https://www.tiktok.com/@arrealstate"><FaTiktok /></a>
    <a href="https://t.me/arrealstate"><FaTelegram /></a>
    <a href="https://twitter.com/arrealstate"><FaXTwitter /></a>
  </div>
</div>

          </ul>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;

