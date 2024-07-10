import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiFileText } from 'react-icons/fi';
import AreaForm from './AreaForm';
import MediaUploader from './MediaUploader'

export default function CreateListing() {
  const [videoUploadError, setVideoUploadError] = useState(false);
  const [files, setFiles] = useState(null);
  // const [uploadingFiles, setUploadingFiles] = useState(false);
  // const [otherFiles, setOtherFiles] = useState([]);
  // const [imageUploading, setImageUploading] = useState(false);
  const [fileFiles, setFileFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); 
  const [videoFiles, setVideoFiles] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    // discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    InvestmentType: '',
    InvestmentTypeDetails: '',
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
    // cashAmount:0,
    BUA:0,
    priceMin:50,
    priceMax:0,
    internalAreaMin:0,
    internalAreaMax:0,
    externalAreaMin:0,
    externalAreaMax:0,
    totalAreaMin:0,
    totalAreaMax:0,
    showMinMax:false,
    showCheq:false,
    });

  const realEstateTypes = [
    'Apartment/Flat',
    'Villa/TownHouse',
    'Land/Plot',
    'Retail Space/Shop/Store',
    'Office/Office Space',
    'Warehouse/Storage Space',
    'Commercial Building/Commercial Property'
  ];
  const showMinMax = formData.showMinMax
  const showCheq = formData.showCheq

  console.log (showCheq)

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(formData);
  const handleImageSubmit = (e) => {
    if (imageFiles.length > 0 && imageFiles.length + formData.imageUrls.length < 31) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(storeImage(imageFiles[i]));
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
  
  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
  
    if (id === 'buy' || id === 'rent' || id === 'sale') {
      setFormData({ ...formData, type: id });
    } else if (id === 'parking' || id === 'furnished' || id === 'showMinMax' || id === 'showCheq') {
      setFormData({ ...formData, [id]: checked });

  } else if (id === 'offer') {
    const newOffer = e.target.checked;
  
    if (newOffer) {
      setFormData({ ...formData, offer: newOffer });
    } else {
      setFormData({ ...formData, offer: newOffer, discountPrice: 0 });
    }
  

    } else if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({ ...formData, [id]: value });
    } else if (id === 'InvestmentType') {
      setFormData({ ...formData, InvestmentType: value });
    } else if (id === 'filesUrls') {
      setFiles([...files]);
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, filesUrls: urls });
    } else if (
      id === 'internalAreaMin' ||
      id === 'internalAreaMax' ||

      id === 'externalAreaMin' ||
      id === 'externalAreaMax' ||

      id === 'projectName' ||
      id === 'propertyAddressInProject' ||
      id === 'rentalType'||
      id === 'BUA' 
    ) 

    {
      setFormData({ ...formData, [id]: value });
    } else if (id === 'totalAreaMin') {
      const totalAreaMinValue = parseFloat(formData.internalAreaMin || 0) + parseFloat(formData.externalAreaMin || 0);
      setFormData({ ...formData, [id]: totalAreaMinValue });
    } else if (id === 'totalAreaMax') {
      const totalAreaMaxValue = parseFloat(formData.internalAreaMax || 0) + parseFloat(formData.externalAreaMax || 0);
      setFormData({ ...formData, [id]: totalAreaMaxValue });
    
    } else if (id === 'ageYear' || id === 'ageMonth') {
      setFormData({ ...formData, [id]: value });
    } else if ( id === 'realEstateType') {
      setFormData({ ...formData, [id]: value });
    } else if (id === 'paymentType') {
      const newPaymentType = e.target.checked ? 'cash' : 'cheq';
      if (newPaymentType === 'cash') {
        const newCashAmount = formData.priceMin;
        setFormData({ ...formData, cashAmount: newCashAmount , paymentType: newPaymentType });
      } else {
        setFormData({ ...formData, cashAmount: 0 , paymentType: newPaymentType });

      }
     

    } else if (id === 'numberOfCheques') {
        setFormData({ ...formData, [id]: value });
      
        const numericValue = parseInt(value);
        // const totalOrOfferPrice = formData.offer ? Math.min(+formData.priceMin, +formData.discountPrice) : +formData.priceMin;
      
        const updatedChequeAmountMin = (numericValue !== 0 && formData.priceMin !== 0) ? ( formData.priceMin / numericValue) : 0;
      
        const updatedChequeAmountMax = (numericValue !== 0 && formData.priceMax !== 0) ? ( formData.priceMax / numericValue) : 0;
        setFormData({
          ...formData,
          [id]: value,
          chequeAmountMin: updatedChequeAmountMin,
          [id]: value,
          chequeAmountMax: updatedChequeAmountMax,

        });
      
    }
      
    }; 
  
  const storeFile = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,'file/'+ fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progressfiles =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progressfiles}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((err) => {
                reject(err);
              });
          }
        );
      });
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  };


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'image/'+ fileName);
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
  const handleRemoveFile = (index) => {
    const updatedFiles = [...formData.filesUrls];
    updatedFiles.splice(index, 1); // Remove the file at the specified index
    setFormData({
      ...formData,
      filesUrls: updatedFiles,
    });
  };
  
  const handleRemoveVideo = (index) => {
    const updatedVideos = [...formData.videoUrls];
    updatedVideos.splice(index, 1); 
    setFormData({
      ...formData,
      videoUrls: updatedVideos,
    });
  };

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
          setVideoUploading(false); // Set videoUploading to false when upload is finished
        })
        .catch((err) => {
          setVideoUploadError('Video upload failed');
          setVideoUploading(false); // Set videoUploading to false on upload failure
        });
    } else {
      setVideoUploadError('Please select a video file to upload');
    }
  };

  const storeVideo = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'Video/' + fileName);
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

    

  
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formSubmitted) {
      return;
    }
  
    try {
      if (formData.imageUrls.length < 1) {
        setError('You must upload at least one image');
        return;
      }
      setLoading(true);
      setError(false);
  
      // Prepare the submission data including the freshly calculated totalArea
      const submissionData = {
        ...formData,
        userRef: currentUser._id,
        priceMax: Number(formData.priceMax),
        priceMin: Number(formData.priceMin),
      internalAreaMin : Number(formData.internalAreaMin),
      internalAreaMax : Number(formData.internalAreaMax),
      externalAreaMin : Number(formData.externalAreaMin),
      externalAreaMax : Number(formData.externalAreaMax),
      };
  
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
  
      setLoading(false);
  
      if (data.success === false) {
        setError(data.message);
      } else {
        // Set the formSubmitted state to true after successful submission
        setFormSubmitted(true);
        navigate(`/listing/${data._id}`);
        // console.log('newListingAdded');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


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
      setFileUploadError('Please select file(s) to upload');
    }
  };


  return (
    <main className='p-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
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
          
    <div>
      <h2 className="text-lg font-semibold mb-2">Property Features:</h2>
      {formData.type !== 'rent' && (
  <main>
    <div className='flex flex-col'>
      <label htmlFor='realEstateType' className='text-sm ml-2'>
        Real Estate Type:
      </label>
      <select
        id='realEstateType'
        className='border p-3 rounded-lg mb-4'
        value={formData.realEstateType}
        onChange={handleChange}
        {...(formData.type === 'rent' && { required: false })}
      >
        <option value=''>Select Real Estate Type</option>
        {realEstateTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div> 
    </main>
)}
<div className='rounded border-gray-300 focus:ring-indigo-500 justify-center align-center mb-4'
>
      <div className='flex gap-2 items-center'>
        <input
          type='checkbox'
          id='showMinMax'
          className='h-5 w-5 rounded border-gray-300 focus:ring-indigo-500 justify-center align-center'
          onChange={handleChange}
          checked={formData.showMinMax}
        />
        <span>Show Min Max</span>
      </div>
      </div>




      
      {formData.realEstateType !== 'Office/Office Space' && formData.realEstateType !== 'Land/Plot'  && (



<main>      
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bedrooms'
            min='0'
            max='10'
            className='p-3 border border-gray-300 rounded-lg'
            onChange={handleChange}
            value={formData.bedrooms}
            {...(formData.realEstateType === 'Office/Office Space' || formData.realEstateType === 'Land/Plot' && { required: false })}
          />
          <p>Beds</p>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bathrooms'
            min='0'
            max='10'
            className='p-3 border border-gray-300 rounded-lg'
            onChange={handleChange}
            value={formData.bathrooms}
            {...(formData.realEstateType === 'Office/Office Space' || formData.realEstateType == 'Land/Plot' && { required: false })}
          />
          <p>Baths</p>
        </div>
        </div>
        </main>
)}
        <AreaForm formData={formData} handleChange={handleChange} />
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



            {/* <h2 className="text-lg font-semibold my-2 mt-6">Apartment Details:</h2> */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full '>
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
          <p>{formData.showMinMax ? 'Min Price' : 'Price'}</p>
          <span className='text-xs'>(AED)</span>
        </div>

        {formData.showMinMax && (
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='priceMax'
              min='0'
              max='10000000000'
              className='p-3 border border-gray-300 rounded-lg'
              onChange={handleChange}
              value={formData.priceMax}
            />
            <p>Max Price</p>
            <span className='text-xs'>(AED)</span>
          </div>
        )}
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
 </div>
 <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>    

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
<div>

      <div className='flex gap-2 mb-5 items-center'>
        <input
          type='checkbox'
          id='showCheq'
          className='h-5 w-5 rounded  border-gray-300 focus:ring-indigo-500 justify-center align-center'
          onChange={handleChange}
          checked={formData.showCheq}
        />
        <span>Show Cheq</span>
      </div>
{showCheq === true?(<section>


{/* {formData.realEstateType !== 'Office/Office Space' && formData.realEstateType !== 'Land/Plot'  && ( */}
      {formData.paymentType === 'cheq' ||  formData.realEstateType === 'Land/Plot' ? (
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <div className='flex flex-col'>
            <label htmlFor='numberOfCheques' className='text-sm ml-2 '>
              N.O. Cheque:
            </label>
            <select
              id='numberOfCheques'
              className='border p-3 rounded-lg mb-4 w-full'
              value={formData.numberOfCheques}
              onChange={handleChange}
              {...(formData.paymentType === 'cash' || formData.realEstateType === 'Land/Plot' && { required: false })}
            >
              <option value=''>Select N.O. Cheque</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='4'>4</option>
              <option value='6'>6</option>
            </select>
          </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          {/* Input for Cheque Amount Min */}
          <div className='flex flex-col'>
            <label htmlFor='chequeAmountMin' className='text-sm ml-2'>
              {showMinMax ? 'Cheque Amount Min:' : 'Cheque Amount :'}

            </label>
            <div className='flex justify-center items-center'>
              <input
                type='text'
                id='chequeAmountMin'
                className='border p-3 rounded-lg w-full'
                value={formData.chequeAmountMin}
                onChange={handleChange}
              />
              <label className='flex text-sm m-2'>AED</label>
            </div>
          </div>
          {showMinMax && (
            <>
          {/* Input for Cheque Amount Max */}
          <div className='flex flex-col'>
            <label htmlFor='chequeAmountMax' className='text-sm ml-2'>
              Cheque Amount Max:
            </label>
            <div className='flex justify-center items-center'>
              <input
                type='text'
                id='chequeAmountMax'
                className='border p-3 rounded-lg w-full'
                value={formData.chequeAmountMax}
                onChange={handleChange}
              />
              <label className='flex text-sm m-2'>AED</label>
            </div>

          </div>
          </> )}

        </div>
        </>
        ):(""
      )}
      </section>
):('')}
    </div>


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
      value={formData.priceMin}
      onChange={handleChange}
      // {...(formData.paymentType != 'cash' && { required: false })}

    />
     <label className='flex text-sm m-2'>
       AED
    </label>
    </div>

  </div>
</div>
 )}


      <div className='grid gap-4 w-full'>

    {formData.type !== 'rent' || formData.realEstateType !== 'Land/Plot' ? (
<main>
    <section className='flex'>
      <div className='flex flex-col'>
        <label htmlFor='apartmentAge' className='text-sm ml-2'>
          Real Estate Age:
        </label>
        <div className='flex justify-center items-center flex-row'>
          <input
            type='number'
            placeholder='Years Age'
            className='border p-5 rounded-lg w-1/2'
            id='ageYear'
            onChange={handleChange}
            value={formData.ageYear}
            {...(formData.type === 'rent' || formData.realEstateType === 'Land/Plot' && { required: false })}
          />
          <label htmlFor='ageYear' className='text-sm p-1'>
            Year
          </label>
          <input
            type='number'
            placeholder='ageMonth'
            className='border p-5 rounded-lg w-1/2'
            id='ageMonth'
            onChange={handleChange}
            value={formData.ageMonth}
            {...(formData.type === 'rent' || formData.realEstateType === realEstateTypes[2] && { required: false })}
          />
          <label htmlFor='ageMonth' className='text-sm ml-2 p-1'>
            Month 
          </label>
        </div>
      </div>
    </section>
  </main>
    ):(""
)}




</div>          
        </div>   


        </div>

        <div className='flex flex-col flex-1 gap-4'>
            

        <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}

         

          <MediaUploader
      formData={formData}
      setFileFiles={setFileFiles}
      handleFileSubmit={handleFileSubmit}
      handleRemoveFile={handleRemoveFile}
      setVideoFiles={setVideoFiles}
      handleVideoSubmit={handleVideoSubmit}
      videoUploadError={videoUploadError}
      handleRemoveVideo={handleRemoveVideo}
      setImageFiles={setImageFiles}
      handleImageSubmit={handleImageSubmit}
      imageUploadError={imageUploadError}
      handleRemoveImage={handleRemoveImage}
      uploading={uploading}
      fileUploading={fileUploading}
      videoUploading={videoUploading}

       

      
    />


        </div>          
       
      
      </form>
    </main>
    
  );
}
