import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFileText } from 'react-icons/fi';


export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    videoUrls: [],
    filesUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 0,
    bathrooms: 0,
    priceMin: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    InvestmentType: '',
    InvestmentTypeDetails: '',
    apartmentArea: 0,
    balconyArea: 0,
    totalArea: '',
    projectName: '',
    propertyAddressInProject: '',
    rentalType: '',
    numberOfCheques: '',
    chequeAmountMin: 0 ,
    chequeAmountMax: 0 ,

    buildingYear: '',
    apartmentAge: '',
    realEstateType:'',
    ageMonth:0,
    ageYear:0,
    paymentType:'cheq',
    cashAmount:0,
  });



  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileFiles, setFileFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState('');
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState('');

  const realEstateTypes = [
    'Apartment/Flat',
    'Villa/TownHouse ',
    'Land/Plot',
    'Retail Space/Shop/Store',
    'Office/Office Space',
    'Warehouse/Storage Space',
    'Commercial Building/Commercial Property'
  ];

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 31) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 30 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,'image/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };




  const handleChange = (e) => {
    if (e.target.id === 'buy' || e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.id === 'InvestmentType' || e.target.id === 'InvestmentTypeDescription' || e.target.id === 'realEstateType') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });}
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea' 
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.priceMin < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const storeVideo = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,'video/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };
  
  const handleRemoveVideo = (index) => {
    setFormData({
      ...formData,
      videoUrls: formData.videoUrls.filter((_, i) => i !== index),
    });
  };
  
  // Function to handle video submission/upload
  const handleVideoSubmit = () => {
    if (videoFiles.length > 0) {
      setVideoUploading(true);
      setVideoUploadError(false);
      const promises = [];
  
      for (let i = 0; i < videoFiles.length; i++) {
        promises.push(storeVideo(videoFiles[i]));
      }
  
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            videoUrls: formData.videoUrls.concat(urls),
          });
          setVideoUploadError(false);
          setVideoUploading(false);
        })
        .catch((err) => {
          setVideoUploadError('Video upload failed');
          setVideoUploading(false);
        });
    } else {
      setVideoUploadError('Please select a video file to upload');
    }
  };
  
  // Function to store file in Firebase Storage
const storeFile = async (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,'file/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

// Function to handle file submission/upload
const handleFileSubmit = () => {
  if (fileFiles.length > 0) {
    setFileUploading(true);
    setFileUploadError(false);
    const promises = [];

    for (let i = 0; i < fileFiles.length; i++) {
      promises.push(storeFile(fileFiles[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          filesUrls: formData.filesUrls.concat(urls),
        });
        setFileUploadError(false);
        setFileUploading(false);
      })
      .catch((err) => {
        setFileUploadError('File upload failed');
        setFileUploading(false);
      });
  } else {
    setFileUploadError('Please select a file to upload');
  }
};

// Function to remove a file from the list
const handleRemoveFile = (index) => {
  setFormData({
    ...formData,
    filesUrls: formData.filesUrls.filter((_, i) => i !== index),
  });
};
  
  return (
    <>
  
    <main className='p-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
      Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
           
        <div className='flex flex-col gap-4 flex-1'>
        <h2 className="text-lg font-semibold mb-2">Basic Information:</h2>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>

  
  <input
    type='text'
    placeholder='Project Name'
    className='border p-3 rounded-lg'
    id='projectName'
    required
    onChange={handleChange}
    value={formData.projectName}
  />
  
  <input
    type='text'
    placeholder='Property Address In Project'
    className='border p-3 rounded-lg'
    id='propertyAddressInProject'
    required
    onChange={handleChange}
    value={formData.propertyAddressInProject}
  />

</div>
<h2 className="text-lg font-semibold mb-2">Property Details:</h2>
          <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='buy'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'buy'}
              />
              <span>Buy</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            {/* <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div> */}
       
           
          </div>

          <h2 className="text-lg font-semibold mb-2">Property Features:</h2>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='0'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='0'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='priceMin'
                min='0'
                max='10000000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.priceMin}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                  <span className='text-xs'>(AED )</span>

                
              </div>
              </div>
              {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                
                    <span className='text-xs'>(AED)</span>
           

                  
                </div>
              </div>
            )}

            <div className='inline w-full sm:flex-row sm:gap-4'>


              <select
                  id="InvestmentType"
                  className="border p-3 rounded-lg inline my-3 w-full"
                  onChange={handleChange}
                  value={formData.InvestmentType}
                >
                  <option value="">Select Investment Type</option>
                  <option value="payment Plan">Payment Plan</option>
                  <option value="handover">Handover</option>
                  <option value="ready">Ready</option>
                </select>
                <div>

                <textarea
                      type='text'
                      placeholder='Investment Type Details'
                      className='border p-3 rounded-lg inline w-full'
                      id='InvestmentTypeDetails'
                      required
                      onChange={handleChange}
                      value={formData.InvestmentTypeDetails}
                     />
            </div>
            </div>

            <h2 className="text-lg font-semibold my-2 mt-6">Apartment Details:</h2>
    

<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
  <div className='flex flex-col'>
    <label htmlFor='apartmentArea' className='text-sm ml-2'>
      Apartment Area (Sqft):
    </label>
    <input
      type='number'
      placeholder='Apartment Area'
      className='border p-3 rounded-lg'
      id='apartmentArea'
      required
      onChange={handleChange}
      value={formData.apartmentArea}
    />
  </div>
  <div className='flex flex-col'>
    <label htmlFor='balconyArea' className='text-sm ml-2'>
      Balcony Area (Sqft):
    </label>
    <input
      type='number'
      placeholder='Balcony Area'
      className='border p-3 rounded-lg'
      id='balconyArea'
      required
      onChange={handleChange}
      value={formData.balconyArea}
    />
  </div>
  <div className='flex flex-col'>
    <label htmlFor='totalArea' className='text-sm ml-2'>
      Total Area (Sqft):
    </label>
    <input
      type='text'
      placeholder='Total Area'
      className='border p-3 rounded-lg'
      id='totalArea'
      onChange={handleChange}
      value={parseFloat(formData.apartmentArea) + parseFloat(formData.balconyArea)}
    />
  </div>
</div>


<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>

        {formData.type === 'rent' && (
  <div className='flex flex-col'>
    <label htmlFor='rentalType' className='text-sm ml-2'>
      Rental Type:
    </label>
    <select
      className='border p-3 rounded-lg'
      id='rentalType'
      onChange={handleChange}
      value={formData.rentalType}
      style={{ display: formData.type === 'rent' ? 'block' : 'none' }}
      {...(formData.type === 'buy' || formData.type === 'sale' && { required: false })}
    
    >
      <option value=''>Select Rental Type</option>
      <option value='weekly'>Weekly</option>
      <option value='monthly'>Monthly</option>
      <option value='yearly'>Yearly</option>
    </select>
  </div>
)}
     

{formData.rentalType === 'weekly' && (
  <div className='flex items-center h-full pt-6'>
    <div className='flex gap-2'>
      <input
        type='checkbox'
        id='paymentType'
        className='w-5'
        onChange={handleChange}
        checked={formData.paymentType === 'cash'}
      />
      <label htmlFor='paymentType' className='flex items-center'>
        Cash
      </label>
    </div>
  </div>
)}

</div>

{formData.paymentType === 'cheq' && (
<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
  <div className='flex flex-col'>
    <label htmlFor='numberOfCheques' className='text-sm ml-2'>
      N.O. Cheque:
    </label>
    <select
      id='numberOfCheques'
      className='border p-3 rounded-lg'
      value={formData.numberOfCheques}
      onChange={handleChange}
      {...(formData.paymentType === 'cash' && { required: false })}
    >
      <option value=''>Select N.O. Cheque</option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='4'>4</option>
      <option value='6'>6</option>
    </select>
  </div>
  <div className='flex flex-col'>
    <label htmlFor='chequeAmountMin' className='text-sm ml-2'>
      Cheque Amount:
    </label>
    <div className='flex justify-center items-center'>
    <input 
      type='text'
      id='chequeAmountMin'
      className='border p-3 rounded-lg w-full'
      value={formData.chequeAmountMin}
      onChange={handleChange}
      readOnly
    />
     <label className='flex text-sm m-2'>
       AED
    </label>
    </div>

  </div>
</div>
)}


{formData.paymentType === 'cash' && ( 

<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
  <div className='flex flex-col'>
    <label htmlFor='cashAmount' className='text-sm ml-2'>
      Cash Amount:
    </label>
    <div className='flex justify-center items-center'>
    <input 
      type='text'
      id='cashAmount'
      className='border p-3 rounded-lg w-full'
      value={formData.cashAmount}
      onChange={handleChange}
      {...(formData.paymentType != 'cash' && { required: false })}

    />
     <label className='flex text-sm m-2'>
       AED
    </label>
    </div>

  </div>
</div>
 )}



<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            </div>
            </div>


      <div className='grid grid-cols-1 
      md:grid-cols-2
       gap-4 w-full'>
{formData.type != 'rent' && ( <main  >

<div className='flex flex-col'>
  <label htmlFor='realEstateType' className='text-sm ml-2'>
    Real Estate Type:
  </label>
  <select
    id='realEstateType'
    className='border p-3 rounded-lg'
    value={formData.realEstateType}
    onChange={handleChange}
    {...(formData.type === 'rent' && { required: false })}

  >
    <option 
    value=''>Select Real Estate Type</option>
    {realEstateTypes.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>

<div className='flex flex-col'>
  <label htmlFor='apartmentAge' className='text-sm ml-2'>
  Real Estate Age:
  </label>
  <div className='flex justify-center items-center flex-row'>
  
 
  <input

    type='number'
    placeholder='Years Age'
    className='border p-3 rounded-lg w-1/2'
    id='ageYear'
    onChange={handleChange}
    value={formData.ageYear}
    {...(formData.type === 'rent' && { required: false })}

  />
   <label htmlFor='ageYear' className='text-sm p-1'>
  Year
  </label>
  <input
    type='number'
    placeholder='ageMonth'
    className='border p-3 rounded-lg w-1/2'
    id='ageMonth'
    onChange={handleChange}
    value={formData.ageMonth}
    {...(formData.type === 'rent' && { required: false })}

  />
  <label htmlFor='ageMonth' className='text-sm ml-2 p-1'>
  Month
  </label>
</div>
</div>

</main>
  )}




</div>

      </div>

        <div className='flex flex-col flex-1 gap-4'>

        <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update listing'}
          </button>

          {error && <p className='text-red-700 text-sm'>{error}</p>}

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

         
        </div>        </div>    
      
      </form>
    </main>

    </>
  );
}

