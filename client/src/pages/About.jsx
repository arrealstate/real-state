import React from 'react';
import Footer from './Footer';

export default function About() {
  return (
    <section >
      <main
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dh1lgpmm4/image/upload/v1698664691/AlaaProjects/ARREALSTATE/arabian-ranches-27-7-2020-1024x640_1_u8muxf.jpg')`,
        }}
        className='bg-cover bg-center bg-no-repeat min-h-screen m-0'
      >
        <div className='bg-cover bg-center sm:py-20 px-4 max-w-6xl mx-auto'>
          <div className='bg-white bg-opacity-70 p-8 rounded-lg'>
            <div className='flex items-center mb-4'>
              <img
                src='https://res.cloudinary.com/dh1lgpmm4/image/upload/v1694983534/AlaaProjects/ARREALSTATE/Logo_vmlkrd.png'
                alt='A.R Estate Logo'
                className='mr-4 w-12 h-12'
              />
              <h1 className='text-3xl font-bold text-slate-800'>
                About AR Estate
              </h1>
            </div>
            <p className='mb-4 text-slate-700'>
              AR Estate is a leading real estate agency that specializes in
              helping clients buy, sell, and rent properties in the most
              desirable neighborhoods. Our team of experienced agents is
              dedicated to providing exceptional service and making the buying
              and selling process as smooth as possible.
            </p>
            <p className='mb-4 text-slate-700'>
              Our mission is to help our clients achieve their real estate goals
              by providing expert advice, personalized service, and a deep
              understanding of the local market. Whether you are looking to buy,
              sell, or rent a property, we are here to help you every step of the
              way.
            </p>
            <p className='mb-4 text-slate-700'>
              Our team of agents has a wealth of experience and knowledge in the
              real estate industry, and we are committed to providing the highest
              level of service to our clients. We believe that buying or selling
              a property should be an exciting and rewarding experience, and we
              are dedicated to making that a reality for each and every one of
              our clients.
            </p>
          </div>
        </div>
      </main>
      <Footer className="fixed bg-opacity-70 inset-x-0 bottom-10 bg-transparent m-0" />
    </section>
  );
}

