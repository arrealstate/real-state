import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  return (
    <div className="user-item col-span-1">
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
         <Link to={`/developer?id=${user._id}`} className="block w-full h-full">
          <div className="h-[320px] w-auto sm:h-[220px]">
            <img
              src={user.avatar}
              alt="user cover"
              className="w-full object-cover hover:scale-105 transition-scale duration-300"
            />
          </div>
          <div className="bg-white">
          <div className="p-3 bg-white flex flex-col gap-2 w-full relative">
            <p className="truncate text-lg font-semibold text-slate-700">
              {user.username}
            </p>
            <div className="flex  items-center gap-1">
              <p className="text-sm text-gray-600 truncate w-full">
                {user.email}
              </p>
            </div>
            </div>
          </div>
        </Link>
       </div>
    </div>
  );
};

export default UserItem;
