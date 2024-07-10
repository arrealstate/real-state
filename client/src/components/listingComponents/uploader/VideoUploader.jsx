import React, { useState } from 'react';

export default function VideoUploader() {
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [formData, setFormData] = useState({
    videoUrls: [],
  });
  const [videoUploadError, setVideoUploadError] = useState('');

  const handleVideoSubmit = () => {
    // Simulated delay for video upload (replace with actual upload logic)
    setVideoUploading(true);
    setTimeout(() => {
      setVideoUploading(false);

      // Simulated uploaded video URLs (replace with actual uploaded video URLs)
      const uploadedUrls = videoFiles.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, videoUrls: [...formData.videoUrls, ...uploadedUrls] });
      setVideoFiles([]);
    }, 3000); // Simulated 3 seconds delay for upload
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...formData.videoUrls];
    updatedVideos.splice(index, 1);
    setFormData({ ...formData, videoUrls: updatedVideos });
  };

  const handleVideoChange = (e) => {
    setVideoFiles(e.target.files);
  };

  return (
    <div className='flex flex-col flex-1 gap-4'>
      <div className='flex gap-4'>
        <input
          onChange={handleVideoChange}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='videos'
          accept='video/*'
          multiple
        />
        <button
          type='button'
          disabled={uploading || videoUploading || videoFiles.length === 0}
          onClick={handleVideoSubmit}
          className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
        >
          {videoUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <p className='text-red-700 text-sm'>
        {videoUploadError && videoUploadError}
      </p>
      <div>
        {formData.videoUrls.length > 0 &&
          formData.videoUrls.map((url, index) => (
            <div key={index} className='flex justify-between p-3 border items-center'>
              <video
                controls
                src={url}
                className='w-40 h-30 rounded-lg'
              ></video>
              <button
                type='button'
                onClick={() => handleRemoveVideo(index)}
                className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
