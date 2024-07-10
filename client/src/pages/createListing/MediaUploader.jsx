import React from 'react';
import { FiFileText } from 'react-icons/fi';

const MediaUploader = ({
  formData,
  setFileFiles,
  handleFileSubmit,
  handleRemoveFile,
  setVideoFiles,
  handleVideoSubmit,
  videoUploadError,
  handleRemoveVideo,
  setImageFiles,
  handleImageSubmit,
  imageUploadError,
  handleRemoveImage,
  uploading,
  fileUploading,
  videoUploading,
}) => {
  return (
<>


<div className='flex flex-col flex-1 gap-4'>
<p className='font-semibold'>
  Files:
  <span className='font-normal text-gray-600 ml-2'>
    files
  </span>
</p>
<div className='flex gap-4'>
  <input
    onChange={(e) => setFileFiles(e.target.files)}
    className='p-3 border border-gray-300 rounded w-full'
    type='file'
    id='files' 
    accept='*/*'
    multiple
  />
  <button
    type='button'
    disabled={uploading || fileUploading} 
    onClick={handleFileSubmit} 
    className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
  >
    {fileUploading ? 'Uploading...' : 'Upload'} 
  </button>
  </div>
  <div>
{formData.filesUrls.length > 0 &&
formData.filesUrls.map((fileURL, index) => (
<div key={fileURL.name} className='flex justify-between p-3 border items-center'>
<div className="flex items-center">
<FiFileText className="text-blue-500 mr-2" />
<a
href={(fileURL)}
target='_blank'
rel='noopener noreferrer'
className='text-blue-700 underline hover:text-blue-900'
>
  File {(index + 1)}
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
<div className='flex flex-col flex-1 gap-4'>
<p className='font-semibold'>
Videos:
<span className='font-normal text-gray-600 ml-2'>
videos 
</span>
</p>
<div className='flex gap-4'>
<input
onChange={(e) => setVideoFiles(e.target.files)}
className='p-3 border border-gray-300 rounded w-full'
type='file'
id='videos'
accept='video/*'
multiple
/>
<button
type='button'
disabled={uploading || videoUploading} 
onClick={handleVideoSubmit}
className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
>
{videoUploading ? 'Uploading...' : 'Upload'} 
</button>
</div>
<p className='text-red-700 text-sm'>
{videoUploadError && videoUploadError}
</p>
{formData.videoUrls.length > 0 &&
formData.videoUrls.map((url, index) => (
<div key={url} className='flex justify-between p-3 border items-center'>
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
<p className='font-semibold'>
Images:
<span className='font-normal text-gray-600 ml-2'>
The first image will be the cover (max 30)
</span>
</p>
<div className='flex gap-4'>
<input
onChange={(e) => setImageFiles(e.target.files)}
className='p-3 border border-gray-300 rounded w-full'
type='file'
id='images'
accept='image/*'
multiple
/>
<button
type='button'
disabled={uploading}
onClick={handleImageSubmit}
className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
>
{uploading ? 'Uploading...' : 'Upload'}
</button>
</div>
<p className='text-red-700 text-sm'>
{imageUploadError && imageUploadError}
</p>
{formData.imageUrls.length > 0 &&
formData.imageUrls.map((url, index) => (
<div
key={url}
className='flex justify-between p-3 border items-center'
>
<img
src={url}
alt='listing image'
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

</>
);
};

export default MediaUploader;
