// import { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';

// const VideoPlayer = ({ videoUrls, closePopup }) => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const handleNextVideo = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1 < videoUrls.length ? prevIndex + 1 : 0));
//   };

//   const handlePreviousVideo = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : videoUrls.length - 1));
//   };

//   return (
//     <div className="relative">
//       <span
//         className="absolute top-2 left-2 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
//         onClick={closePopup}
//       >
//         <FaTimes />
//       </span>
//       <div className="video-player">
//         <div className="w-auto video-container h-96 overflow-hidden ">
//           <video controls className="video" src={videoUrls[currentVideoIndex]} />
//         </div>
//         <div className="video-controls flex justify-between mt-4">
//           <button onClick={handlePreviousVideo} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
//             Previous
//           </button>
//           <button onClick={handleNextVideo} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const VideoPlayer = ({ videoUrls, closePopup }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1 < videoUrls.length ? prevIndex + 1 : 0));
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : videoUrls.length - 1));
  };

  return (
    <div className="relative">
      <span
        className="absolute top-2 left-2 text-gray-700 cursor-pointer z-50 p-4 bg-white rounded-full shadow-md"
        onClick={closePopup}
      >
        <FaTimes />
      </span>
      <div className="video-player">
        <div className="w-full overflow-hidden">
          <video
            controls
            className="w-full h-full object-cover"
            src={videoUrls[currentVideoIndex]}
            style={{ aspectRatio: '16/9' , height:'500px'}} // Example aspect ratio, adjust as needed
          />
        </div>
        <div className="video-controls flex justify-between mt-4">
          <button
            onClick={handlePreviousVideo}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={handleNextVideo}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
