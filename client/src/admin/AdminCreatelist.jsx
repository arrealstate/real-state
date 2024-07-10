import React, { useState } from 'react';
import Axios from 'axios';

function AdminCreateListing() {
  const [listingData, setListingData] = useState({
    name: '',
    description: '',
    address: '',
    priceMin: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'buy',
    offer: false,
    imageUrls: [],
    userRef: 'admin-user-id', // Replace with the admin user's ID
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('/api/create', listingData);
      console.log('New listing created:', response.data);
      // Optionally, you can redirect the admin to a listings page after successful creation.
      // history.push('/listings');
    } catch (error) {
      console.error('Error creating a new listing:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Handle input values based on their types (e.g., number or boolean)
    const updatedValue = type === 'number' ? parseFloat(value) : type === 'checkbox' ? event.target.checked : value;

    setListingData({
      ...listingData,
      [name]: updatedValue,
    });
  };

  return (
    <div>
      <h1>Create New Listing (Admin)</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={listingData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={listingData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={listingData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="priceMin">Regular Price:</label>
          <input
            type="number"
            id="priceMin"
            name="priceMin"
            value={listingData.priceMin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discountPrice">Discount Price:</label>
          <input
            type="number"
            id="discountPrice"
            name="discountPrice"
            value={listingData.discountPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bathrooms">Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={listingData.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={listingData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="furnished">Furnished:</label>
          <input
            type="checkbox"
            id="furnished"
            name="furnished"
            checked={listingData.furnished}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="parking">Parking:</label>
          <input
            type="checkbox"
            id="parking"
            name="parking"
            checked={listingData.parking}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={listingData.type}
            onChange={handleChange}
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label htmlFor="offer">Offer:</label>
          <input
            type="checkbox"
            id="offer"
            name="offer"
            checked={listingData.offer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrls">Image URLs (comma-separated):</label>
          <input
            type="text"
            id="imageUrls"
            name="imageUrls"
            value={listingData.imageUrls.join(', ')}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default AdminCreateListing;
