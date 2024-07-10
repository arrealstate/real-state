// OfferAdminPanel.jsx
import React, { useState, useEffect } from 'react';
import OfferService from '../../services/OfferService.js';

const OfferAdminPanel = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountPercentage: 0,
  });
  const [editing, setEditing] = useState(false);

  const fetchOffers = () => {
    OfferService.getAllOffers()
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offers:', error);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      OfferService.updateOffer(selectedOffer._id, formData)
        .then(() => {
          fetchOffers();
          setEditing(false);
          setSelectedOffer(null);
          setFormData({ code: '', description: '', discountPercentage: 0 });
        })
        .catch((error) => {
          console.error('Error updating offer:', error);
        });
    } else {
      OfferService.createOffer(formData)
        .then(() => {
          fetchOffers();
          setFormData({ code: '', description: '', discountPercentage: 0 });
        })
        .catch((error) => {
          console.error('Error creating offer:', error);
        });
    }
  };

  const editOffer = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      code: offer.code,
      description: offer.description,
      discountPercentage: offer.discountPercentage,
    });
    setEditing(true);
  };

  const deleteOffer = (offerId) => {
    OfferService.deleteOffer(offerId)
      .then(() => {
        fetchOffers();
      })
      .catch((error) => {
        console.error('Error deleting offer:', error);
      });
  };

  return (
<div className="container mx-auto p-4">
<div className="mb-8">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Offer List</h2>
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {offers.map((offer) => (
      <li key={offer._id} className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-lg font-semibold mb-2 text-gray-900">
        {offer.code} 
        </p>
        <p className="text-lg font-semibold mb-2 text-gray-900">
        {offer.description} 
        </p>
        <p className="text-lg font-semibold mb-2 text-gray-900">
        {offer.discountPercentage}%
        </p>
        <div className="flex space-x-2">
          <button
            className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => editOffer(offer)}
          >
            Edit
          </button>
          <button
            className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            onClick={() => deleteOffer(offer._id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

<div className="bg-white rounded-lg p-6 shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">{editing ? 'Edit Offer' : 'Create Offer'}</h2>
  <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4 max-w-md">
    <input
      type="text"
      placeholder="Code"
      name="code"
      value={formData.code}
      onChange={handleInputChange}
      className="p-3 border rounded-md"
    />
    <input
      type="text"
      placeholder="Description"
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      className="p-3 border rounded-md"
    />
    <input
      type="number"
      placeholder="Discount Percentage"
      name="discountPercentage"
      value={formData.discountPercentage}
      onChange={handleInputChange}
      className="p-3 border rounded-md"
    />
    <button
      type="submit"
      className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
    >
      {editing ? 'Update' : 'Create'}
    </button>
  </form>
</div>
</div>
);
};


export default OfferAdminPanel;
