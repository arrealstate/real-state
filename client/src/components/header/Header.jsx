import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../pages/color.css";
import ArOffersButton from "./AROfferButton";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    setSearchTerm("");
  }, [location.search]);

  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex justify-between items-center mx-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="ARcolors-100">AR</span>
              <span className="ARcolors-900"> Estate</span>
            </h1>
          </Link>
          <div className="flex justify-between items-center mx-3">
            <ArOffersButton />
          </div>
        </div>

         <Link to="/search">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center"
          > 
            
            <label
        htmlFor="searchInput"
        className="bg-transparent focus:outline-none w-14 sm:w-60 text-gray-500 hidden sm:inline-block"
      >
        Show Listings...
      </label>
            <FaSearch className="text-slate-600" />
          </form> 
    </Link> 
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline items-center">
              Home
            </li>
          </Link>









          {isAdmin ? (
            <Link to="/Admin">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Admin
              </li>
            </Link>
          ) : null}

          {isAdmin ? (
            <Link to="/test">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Test
              </li>
            </Link>
          ) : null}

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
