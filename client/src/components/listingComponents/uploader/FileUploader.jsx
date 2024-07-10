import React, { useState } from 'react';

export default function FileUploader() {
  const [fileFiles, setFileFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [formData, setFormData] = useState({
    filesUrls: [],
  });

  const handleFileSubmit = () => {
    // Simulated delay for file upload (replace with actual upload logic)
    setFileUploading(true);
    setTimeout(() => {
      setFileUploading(false);

      // Simulated uploaded file URLs (replace with actual uploaded file URLs)
      const uploadedUrls = fileFiles.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, filesUrls: [...formData.filesUrls, ...uploadedUrls] });
      setFileFiles([]);
    }, 2000); // Simulated 2 seconds delay for upload
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...formData.filesUrls];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, filesUrls: updatedFiles });
  };

  const handleFileChange = (e) => {
    setFileFiles(e.target.files);
  };

  return (
    <div className='flex flex-col flex-1 gap-4'>
      <div className='flex gap-4'>
        <input
          onChange={handleFileChange}
          className='p-3 border border-gray-300 rounded w-full'
          type='file'
          id='files'
          accept='*/*'
          multiple
        />
        <button
          type='button'
          disabled={uploading || fileUploading || fileFiles.length === 0}
          onClick={handleFileSubmit}
          className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
        >
          {fileUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div>
        {formData.filesUrls.length > 0 &&
          formData.filesUrls.map((fileURL, index) => (
            <div key={index} className='flex justify-between p-3 border items-center'>
              <div className="flex items-center">
                <span>{`File ${index + 1}`}</span>
                <a
                  href={fileURL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-700 underline hover:text-blue-900 ml-2'
                >
                  View
                </a>
              </div>
              <button
                type='button'
                onClick={() => handleRemoveFile(index)}
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
