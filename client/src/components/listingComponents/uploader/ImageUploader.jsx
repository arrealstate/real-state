import React, { useState } from 'react';

export default function ImageUploader({ imageUrls,  }) {
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState('');

  const handleImageSubmit = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);

      // Simulated uploaded image URLs (replace with actual uploaded image URLs)
      const uploadedUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...uploadedUrls] });
      setImageFiles([]);
    }, 1500); // Simulated 1.5 seconds delay for upload
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.imageUrls];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, imageUrls: updatedImages });
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  return (
    <div className='flex flex-col flex-1 gap-4'>
      <div className='flex gap-4'>
        <input
          onChange={handleImageChange}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
        <button
          type='button'
          disabled={uploading || imageFiles.length === 0}
          onClick={handleImageSubmit}
          className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <p className='text-red-700 text-sm'>
        {imageUploadError && imageUploadError}
      </p>
      <div>
        {formData.imageUrls.length > 0 &&
          formData.imageUrls.map((url, index) => (
            <div key={index} className='flex justify-between p-3 border items-center'>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className='w-20 h-20 object-contain rounded-lg'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
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
