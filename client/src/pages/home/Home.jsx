import React, { useEffect, useState } from 'react';
import Footer from '../Footer.jsx';
import HomeButtons from './HomeButtons';
import Notification from './Notification';

const Home = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const addStructuredData = () => {
      const structuredData = [
        {
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "AR RealEstate",
          "url": "http://ar-realstate.com/",
          "description": "Leading real estate agency in Dubai, UAE",
          "logo": "http://ar-realstate.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/ARRealEstate",
            "https://www.youtube.com/ARRealEstate",
            "https://www.facebook.com/ARRealEstate"
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "url": "http://ar-realstate.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "http://ar-realstate.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ];

      structuredData.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(data);
        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      });
    };

    addStructuredData();

    const checkConnectionSpeed = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        setIsSlowConnection(connection.saveData || connection.effectiveType.includes('2g') || connection.effectiveType.includes('slow-2g'));
      }
    };

    checkConnectionSpeed();
  }, []);

  const backgroundImageUrl = 'https://res.cloudinary.com/dh1lgpmm4/image/upload/v1697814256/AlaaProjects/ARREALSTATE/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D8%A8%D8%AF%D9%88%D9%86_%D8%B9%D9%86%D9%88%D8%A7%D9%86_8_1_gova2j.png';
  const videoUrlMp4 = 'https://res.cloudinary.com/dh1lgpmm4/video/upload/v1716069748/AlaaProjects/in7gkxokaekapx2e1vcd.mp4';
  const videoUrlWebm = 'https://res.cloudinary.com/dh1lgpmm4/video/upload/v1716069748/AlaaProjects/in7gkxokaekapx2e1vcd.mp4';

  return (
    <main>
      <Notification />
      <div className="relative min-h-screen">
        {isSlowConnection ? (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            alt="Background"
          />
        ) : (
           <div className="absolute top-0 left-0 w-full h-full" >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImageUrl}
            onPlay={() => setIsVideoPlaying(true)}
          >
            <source src={videoUrlMp4} type="video/mp4" />
            <source src={videoUrlWebm} type="video/webm" />
            Your browser does not support the video tag.
            
          </video>
          
          <HomeButtons loading="lazy" />
          
            </div>
        )}
        {!isVideoPlaying && (
          <div className="relative z-6 flex items-center justify-center min-h-screen">
            <div className="w-full text-center lg:text-white">
              <img
                src="https://res.cloudinary.com/dh1lgpmm4/image/upload/v1694983534/AlaaProjects/ARREALSTATE/Logo_vmlkrd.png"
                alt="AR RealEstate Logo"
                className="mx-auto mb-4 lg:w-1/3"
              />
              <h1 className="z-20 text-4xl lg:text-6xl font-bold ARcolors-300">
                Find Your Next <span className="ARcolors-200">Perfect</span> Place with Us
              </h1>
              <p className="z-20 ARcolors-200 text-lg m-6 lg:text-xl mt-4">
                A.R Estate is the best place to find your next perfect place to live. We have a wide range of properties for you to choose from.
              </p>
              <HomeButtons loading="lazy" />
            </div>
          </div>
        )}
      </div>
      <Footer loading="lazy" />
    </main>
  );
};

export default Home;
