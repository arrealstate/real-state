import { useState } from 'react';
import { FiImage, FiVideo, FiFile } from 'react-icons/fi';

const MediaTabs = ({ value, onChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onChange('images')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md focus:outline-none ${
          value === 'images' ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <FiImage />
        <span className="hidden sm:block">Images</span>
      </button>
      <button
        onClick={() => onChange('videos')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md focus:outline-none ${
          value === 'videos' ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <FiVideo />
        <span className="hidden sm:block">Videos</span>
      </button>
      <button
        onClick={() => onChange('files')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md focus:outline-none ${
          value === 'files' ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <FiFile />
        <span className="hidden sm:block">Files</span>
      </button>
    </div>
  );
};

export default MediaTabs;
