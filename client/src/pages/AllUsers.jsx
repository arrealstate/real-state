import React, { useState, useEffect } from 'react';
import { BsPencil, BsPersonPlus } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';


const TABLE_HEAD = ['Member', 'Role', 'Status', 'Time', 'Edit', ''];

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your actual API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Filter users based on the search query
  const filteredUsers = users.filter(
    ({ username, email, role }) =>
      username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = isSearching
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : users.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1); // Reset pagination to first page on search
  };

  const handleViewAll = () => {
    setIsSearching(false);
    setSearchQuery('');
    setCurrentPage(1); // Reset pagination to first page on view all
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };



  return (
    <div className="h-full w-full border rounded p-4">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h5 className="text-blue-gray bold">Members list</h5>
          <p className="mt-1 text-gray-500">See information about all members</p>
        </div>
        <div className="flex space-x-2">
          <button className="border px-3 py-1 text-sm" onClick={handleViewAll}>
            View All
          </button>
          <button
            className="flex items-center gap-1 border px-3 py-1 text-sm"
            onClick={() => setIsSearching(!isSearching)}
          >
          Show Search 
          </button>
          <Link to='/admin/sign-up'>

          <button
            className="flex items-center gap-1 border px-3 py-1 text-sm"
            onClick={() => setIsSearching(true)}
          >
            <BsPersonPlus className="h-4 w-4" />
            Add member
          </button>
          </Link>
        </div>
      </div>
      {isSearching && (
        <div className="flex items-center justify-between gap-4 w-full">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="border px-3 py-1 text-sm" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}
      {/* <div className="overflow-scroll mt-4"> */}
      <div className="mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="cursor-pointer border-b bg-gray-100 p-4 hover:bg-gray-50">
                  <span className="text-sm text-blue-gray">{head}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
                
    {currentUsers.map(({ username, email, role, createdAt, _id, avatar }) => (
      <tr key={_id} className="p-4 border-b">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <img src={avatar} alt={username} className="w-8 h-8 rounded-full" />
            <div className="flex flex-col">
              <span className="text-sm text-blue-gray font-normal">{username}</span>
              <span className="text-sm text-blue-gray font-normal opacity-70">{email}</span>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-blue-gray font-normal">{role}</span>
            {/* Add other relevant information */}
          </div>
        </td>
        <td className="p-4">
          <div className="w-max">
            <span className="border text-sm py-1 px-2 text-green-600">Online</span>
          </div>
        </td>
        <td className="p-4">
          <span className="text-sm text-blue-gray font-normal">{new Date(createdAt).toLocaleString()}</span>
        </td>
        <td className="p-4">
        <Link to={`/edit-user/${_id}`}>
          <button className="text-sm flex gap-2">
            <BsPencil className="h-4 w-4" />
            Edit 
          </button>
          </Link >
        </td>
        </tr>
    ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t p-4">
        <span className="text-sm text-blue-gray font-normal">
          Page {currentPage} of {Math.ceil((isSearching ? filteredUsers.length : users.length) / usersPerPage)}
        </span>
        <div className="flex space-x-2">
          <button className="border px-3 py-1 text-sm" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            className="border px-3 py-1 text-sm"
            onClick={nextPage}
            disabled={indexOfLastUser >= (isSearching ? filteredUsers.length : users.length)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
