import React from 'react';

const AreaForm = ({ formData, handleChange, showMinMax }) => {
  showMinMax = formData.showMinMax
  // console.log("showMinMax", showMinMax);

  return (
    <>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
      {/* Internal Area */}
      <div className='flex flex-col'>
        <label htmlFor='internalArea' className='text-sm ml-2'>
          {showMinMax ? 'Internal Area Min (Sqft):' : 'Internal Area (Sqft):'}
        </label>
        <input
          type='number'
          placeholder='Internal Area Min'
          className='border p-3 rounded-lg'
          id='internalAreaMin'
          required
          onChange={handleChange}
          value={formData.internalAreaMin}
        />
      </div>

      {/* External Area */}
      <div className='flex flex-col'>
        <label htmlFor='externalArea' className='text-sm ml-2'>
          {showMinMax ? 'External Area Min (Sqft):' : 'External Area (Sqft):'}
        </label>
        <input
          type='number'
          placeholder='External Area Min'
          className='border p-3 rounded-lg'
          id='externalAreaMin'
          required
          onChange={handleChange}
          value={formData.externalAreaMin}
        />
      </div>

      {/* Total Area */}
      <div className='flex flex-col'>
        <label htmlFor='totalAreaMin' className='text-sm ml-2'>
          {showMinMax ? 'Total Area Min (Sqft):' : 'Total Area (Sqft):'}
        </label>
        <input
          type='number'
          placeholder='Total Area Min'
          className='border p-3 rounded-lg'
          id='totalAreaMin'
          required
          onChange={handleChange}
          value={formData.totalAreaMin}
        />
      </div>
      </div>

      {/* Conditional Rendering for Max fields */}
      {showMinMax ? (
        <>
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>

          {/* Internal Area Max */}
          <div className='flex flex-col'>
            <label htmlFor='internalAreaMax' className='text-sm ml-2'>
              Internal Area Max (Sqft):
            </label>
            <input
              type='number'
              placeholder='Internal Area Max'
              className='border p-3 rounded-lg'
              id='internalAreaMax'
              onChange={handleChange}
              value={formData.internalAreaMax}
            />
          </div>

          {/* External Area Max */}
          <div className='flex flex-col'>
            <label htmlFor='externalAreaMax' className='text-sm ml-2'>
              External Area Max (Sqft):
            </label>
            <input
              type='number'
              placeholder='External Area Max'
              className='border p-3 rounded-lg'
              id='externalAreaMax'
              required
              onChange={handleChange}
              value={formData.externalAreaMax}
            />
          </div>

          {/* Total Area Max */}
          <div className='flex flex-col'>
            <label htmlFor='totalAreaMax' className='text-sm ml-2'>
              Total Area Max (Sqft):
            </label>
            <input
              type='number'
              placeholder='Total Area Max'
              className='border p-3 rounded-lg'
              id='totalAreaMax'
              required
              onChange={handleChange}
              value={formData.totalAreaMax}
            />
          </div>
        </div>
        </>
      ):("")
      }

      {/* BUA */}
      <div className='flex flex-col'>
        <label htmlFor='BUA' className='text-sm ml-2'>
          BUA (Sqft):
        </label>
        <input
          type='number'
          placeholder='BUA'
          className='border p-3 rounded-lg'
          id='BUA'
          required
          onChange={handleChange}
          value={formData.BUA}
        />
      </div>
    </>

  );
};

export default AreaForm;
