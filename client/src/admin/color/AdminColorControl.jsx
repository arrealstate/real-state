import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminColorControl = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedBgColor, setSelectedBgColor] = useState('');
  const [colorError, setColorError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('/api/user/');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching user list:', error);
      // Handle error gracefully (e.g., show an error message to the user)
    }
  };

  const handleColorChange = async () => {
    try {
      if (!selectedUserId || !selectedColor || !selectedBgColor) {
        console.error('Please select a user and provide colors in #000000 format.');
        return;
      }

      await axios.put(`/api/all/${selectedUserId}/color`, {
        color: selectedColor,
        bgColor: selectedBgColor,
      });

      setSuccessMessage('Color updated successfully');

      setTimeout(() => {
        setSuccessMessage('');
        clearForm();
        fetchUserList();
      }, 3000);
    } catch (error) {
      console.error('Error updating user color:', error);
      // Handle error gracefully (e.g., show an error message to the user)
    }
  };

  const clearForm = () => {
    setSelectedUserId('');
    setSelectedColor('');
    setSelectedBgColor('');
    setColorError('');
  };

  const updateUserColor = (userId, username, color, bgColor) => {
    setSelectedUserId(userId);
    setSelectedColor(color || '#FFFFFF');
    setSelectedBgColor(bgColor || '#643c1c');
  };

  const handleColorInputChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);

    const isValidColor = /^#([0-9A-F]{3}){1,2}$/i.test(color);
    if (!isValidColor) {
      setColorError('Color should be in #000000 format.');
    } else {
      setColorError('');
    }
  };

  return (
    <main>
      <h2 className="text-3xl font-semibold mt-6 mx-6">Admin Color Control</h2>
      <div className="container mx-auto px-4 py-8 flex">
        <div className="grid grid-cols-3 gap-4 ">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-200 p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center"
              onClick={() => updateUserColor(user._id, user.username, user.color, user.bgColor)}
            >
              <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full mb-2" />
              <span className="text-lg font-semibold mb-1">{user.username}</span>
              <span className="text-sm">Click to change color</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <label htmlFor="usernameLabel" className="block mb-2 font-semibold">
            Username:
          </label>
          <input
            id="usernameLabel"
            type="text"
            value={users.find((user) => user._id === selectedUserId)?.username || ''}
            readOnly
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <label htmlFor="bgColorInput" className="block mt-4 mb-2 font-semibold">
            Background color:
          </label>
          <input
            id="bgColorInput"
            type="text"
            placeholder="Enter background color in #000000 format"
            value={selectedBgColor}
            onChange={(e) => setSelectedBgColor(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <label htmlFor="colorInput" className="block mt-4 mb-2 font-semibold">
            Text color:
          </label>
          <input
            id="colorInput"
            type="text"
            placeholder="Enter color in #000000 format"
            value={selectedColor}
            onChange={handleColorInputChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {colorError && (
            <div className="mt-2 text-red-600">{colorError}</div>
          )}
          {!colorError && (
            <div className="mt-2 w-full flex items-center justify-center font-bold rounded-lg" style={{ backgroundColor: selectedBgColor, color: selectedColor, height: '50px' }}>
              Test Text
            </div>
          )}

          <button
            onClick={handleColorChange}
            disabled={!selectedUserId || !selectedColor || !selectedBgColor || colorError}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Update Color
          </button>

          {successMessage && (
            <>
              <div className="mt-2 text-green-600">
                {successMessage} 
              </div>
              <div className="mt-2 w-full flex items-center justify-center font-bold rounded-lg" style={{ backgroundColor: selectedBgColor, height: '50px', color: selectedColor, }}>
              {users.find((user) => user._id === selectedUserId)?.username || 'Test Text'}
            </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminColorControl;
