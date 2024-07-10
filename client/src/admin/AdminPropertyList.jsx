import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AdminCreateProperty() {
  const [propertyData, setPropertyData] = useState({
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
    userRef: '', 
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users (you need an endpoint for this)
    Axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('/api/create', propertyData);
      // console.log('New property created:', response.data);
    } catch (error) {
      console.error('Error creating a new property:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Handle input values based on their types (e.g., number or boolean)
    const updatedValue = type === 'number' ? parseFloat(value) : type === 'checkbox' ? event.target.checked : value;

    setPropertyData({
      ...propertyData,
      [name]: updatedValue,
    });
  };

  return (
    <div>
      <h1>Create New Property (Admin)</h1>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="userRef">Select User:</label>
          <select
            id="userRef"
            name="userRef"
            value={propertyData.userRef}
            onChange={handleChange}
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
}

export default AdminCreateProperty;
