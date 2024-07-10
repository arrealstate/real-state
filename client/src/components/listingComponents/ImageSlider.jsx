// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const ImageSlider = ({ imageUrls, closePopup }) => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const showSlide = (index) => {
//     setSlideIndex(index);
//   };

//   const prevSlide = () => {
//     const newIndex = slideIndex === 0 ? imageUrls.length - 1 : slideIndex - 1;
//     showSlide(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = slideIndex === imageUrls.length - 1 ? 0 : slideIndex + 1;
//     showSlide(newIndex);
//   };

//   return (
//     <main className="max-w-screen-lg mx-auto max-h-screen relative">
//       <span
//         className="absolute top-2 left-2 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
//         onClick={closePopup} // Close button functionality
//       >
//         <FaTimes />
//       </span>
//       <div
//         className="overflow-hidden rounded-lg"
//         style={{ aspectRatio: "16/9", height: "500px" }}
//       >
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${slideIndex * 100}%)` }}
//         >
//           {imageUrls.map((imageUrl, index) => (
//             <div className="w-full flex-shrink-0" key={index}>
//               <div className="h-full">
//                 <img
//                   src={imageUrl}
//                   alt={`Slide ${index}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//           {/* </div> */}
//         </div>

//         <div
//           className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer	"
//           onClick={prevSlide}
//         >
//           Previous
//         </div>
//         <div
//           className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer	"
//           onClick={nextSlide}
//         >
//           Next
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ImageSlider;
// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const ImageSlider = ({ imageUrls, closePopup }) => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const showSlide = (index) => {
//     setSlideIndex(index);
//   };

//   const prevSlide = () => {
//     const newIndex = slideIndex === 0 ? imageUrls.length - 1 : slideIndex - 1;
//     showSlide(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = slideIndex === imageUrls.length - 1 ? 0 : slideIndex + 1;
//     showSlide(newIndex);
//   };

//   return (
//     <main className="max-w-screen-lg mx-auto max-h-screen relative">
//       <span
//         className="absolute top-2 left-2 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
//         onClick={closePopup}
//       >
//         <FaTimes />
//       </span>
//       <div className="overflow-hidden rounded-lg relative">
//         <div
//           className="flex w-full h-full transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${slideIndex * 100}%)` }}
//         >
//           {imageUrls.map((imageUrl, index) => (
//             <div
//               className="w-full h-full flex-shrink-0"
//               style={{ minWidth: "100%" }}
//               key={index}
//             >
//               <img
//                 src={imageUrl}
//                 alt={`Slide ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={prevSlide}>Previous</button>
//         </div>
//         <div className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={nextSlide}>Next</button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ImageSlider;
// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const ImageSlider = ({ imageUrls, closePopup }) => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const showSlide = (index) => {
//     setSlideIndex(index);
//   };

//   const prevSlide = () => {
//     const newIndex = slideIndex === 0 ? imageUrls.length - 1 : slideIndex - 1;
//     showSlide(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = slideIndex === imageUrls.length - 1 ? 0 : slideIndex + 1;
//     showSlide(newIndex);
//   };

//   return (
//     <main className="max-w-screen-lg mx-auto max-h-screen relative flex items-center justify-center">
//       <span
//         className="absolute top-0 left-0 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
//         onClick={closePopup}
//       >
//         <FaTimes />
//       </span>
//       <div className="overflow-hidden rounded-lg relative">
//         <div
//           className="flex w-full h-full transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${slideIndex * 100}%)` }}
//         >
//           {imageUrls.map((imageUrl, index) => (
//             <div
//               className="w-full h-full flex-shrink-0"
//               style={{ minWidth: "100%" }}
//               key={index}
//             >
//               <img
//                 src={imageUrl}
//                 alt={`Slide ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={prevSlide}>Previous</button>
//         </div>
//         <div className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={nextSlide}>Next</button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ImageSlider;

// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const ImageSlider = ({ imageUrls, closePopup }) => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const showSlide = (index) => {
//     setSlideIndex(index);
//   };

//   const prevSlide = () => {
//     const newIndex = slideIndex === 0 ? imageUrls.length - 1 : slideIndex - 1;
//     showSlide(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = slideIndex === imageUrls.length - 1 ? 0 : slideIndex + 1;
//     showSlide(newIndex);
//   };

//   return (
//     <main className="max-w-screen-lg mx-auto max-h-screen relative flex items-center justify-center">
//       <span
//         className="absolute top-0 left-0 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
//         onClick={closePopup}
//       >
//         <FaTimes />
//       </span>
//       <div className="overflow-hidden rounded-lg relative">
//         <div
//           className="flex w-full h-full transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${slideIndex * 100}%)` }}
//         >
//           {imageUrls.map((imageUrl, index) => (
//             <div
//               className="w-full h-full flex-shrink-0"
//               style={{ minWidth: "100%" }}
//               key={index}
//             >
//               <img
//                 src={imageUrl}
//                 alt={`Slide ${index}`}
//                 className="w-full h-auto sm:h-full object-cover"
//                 style={{ maxHeight: "80vh" }}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={prevSlide}>Previous</button>
//         </div>
//         <div className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
//           <button onClick={nextSlide}>Next</button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ImageSlider;

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ImageSlider = ({ imageUrls, closePopup }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const showSlide = (index) => {
    setSlideIndex(index);
  };

  const prevSlide = () => {
    const newIndex = slideIndex === 0 ? imageUrls.length - 1 : slideIndex - 1;
    showSlide(newIndex);
  };

  const nextSlide = () => {
    const newIndex = slideIndex === imageUrls.length - 1 ? 0 : slideIndex + 1;
    showSlide(newIndex);
  };

  return (
    <main className="max-w-screen-lg mx-auto max-h-screen relative">
      <span
        className="absolute top-2 left-2 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
        onClick={closePopup}
      >
        <FaTimes />
      </span>
      <div className="overflow-hidden rounded-lg relative flex items-center">
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              className="w-full flex-shrink-0 flex justify-center"
              key={index}
            >
              <img
                src={imageUrl}
                alt={`Slide ${index}`}
                className="h-auto max-h-full object-cover"
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
          <button onClick={prevSlide}>Previous</button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white py-2 px-3 rounded-full z-10 cursor-pointer">
          <button onClick={nextSlide}>Next</button>
        </div>
      </div>
    </main>
  );
};

export default ImageSlider;
