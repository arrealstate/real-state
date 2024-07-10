import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const FileViewer = ({ filesUrls, closePopup }) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleNextFile = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex + 1 < filesUrls.length ? prevIndex + 1 : 0));
  };

  const handlePreviousFile = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : filesUrls.length - 1));
  };

  return (
    <div className="relative">
      
      <div className="file-viewer">
        <div className="file-container h-96 overflow-hidden">
          {/* Displaying file URLs as clickable links with unique keys */}
          {filesUrls.length > 0 &&
            filesUrls.map((fileURL, index) => (
              <div key={index} className='flex justify-between p-3 border items-center'>
                <div className="flex items-center">
                  <FiFileText className="text-blue-500 mr-2" />
                  <a
                    href={fileURL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-700 underline hover:text-blue-900'
                  >
                    File {(index + 1)}
                  </a>
                </div>
              </div>
            ))}
        </div>
        <div className="file-controls flex justify-between items-center mt-4">
  <button onClick={handlePreviousFile} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
    Previous
  </button>
  <div className="flex items-center"> {/* Using flex layout */}
    <span 
      className="text-gray-700 cursor-pointer p-4 bg-white rounded-full shadow-md"
      onClick={closePopup}  >
      <FaTimes />
    </span>
  </div>
  <div className="flex space-x-4"> {/* Adding space between buttons */}
    <button onClick={handleNextFile} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
      Next
    </button>
  </div>
</div>


      </div>
    </div> 
  );
};

export default FileViewer;
