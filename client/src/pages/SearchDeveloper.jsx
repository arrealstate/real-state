import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/userSlice.js";
import UserItem from "./UserItem.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

const SearchDeveloper = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users: userList } = useSelector(({ user }) => user);
  const usersPerPage = 10;

  const filteredUsers = userList?.filter(
    ({ username, email, role }) =>
      (username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      role.toLowerCase() === "developer"
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = isSearching
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : userList?.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleViewAll = () => {
    setIsSearching(false);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUsers(searchQuery));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>

<div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2  md:border-r-2 md:min-h-screen md:w-1/4">
        <div className="flex justify-between items-center p-4 ">
          <div>


          {/* <div className="flex justify-between items-center mb-7 ">
            <div> */}
              <Link
                to="/search"
                className={`text-gray-600 hover:text-gray-800 ${
                  location.pathname === "/search" ? "text-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FaHome size={24} />
                  <span className="font-semibold  sm:flex md:hidden lg:hidden  xl:flex ">properties</span>
                </div>
              </Link>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-blue-300 p-2 rounded-tl-lg rounded-tr-lg">
                <FaUser size={24} />
                <span className="font-semibold  sm:flex md:hidden lg:hidden  xl:flex ">Developer</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2 flex-wrap w-full">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={searchQuery}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSearch}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 flex-1"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleViewAll}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 flex-1"
              >
                View All
              </button>
            </div>
          </form>
        </div>



<div className="user-list gap-5 flex-wrap my-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center p-3">
  {currentUsers?.map((user) => (
    <UserItem key={user._id} user={user} className="bg-white m-3 sm:w-full" />
  ))}
</div>


      </div>
    </>
  );
};

export default SearchDeveloper;
