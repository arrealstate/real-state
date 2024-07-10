import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
  const pages = {
    User: "/sign-up",
    Admin: "/admin/sign-up",
    Developer: "/dev/sign-up",
    Microdeveloper: "/microDev/sign-up",
    AllUsersList: "/admin/users",
    LoginFormComponent: "/LoginFormComponent",
    "Page 7": "/Page7",
    "Page 8": "/Page8",
    "Page 9": "/Page9",
    "Page 10": "/Page10",
  };

  return (
    <div>
      <h1>Ten Buttons Component</h1>
      <div className="flex flex-col items-center mt-4 space-y-2">
        {Object.entries(pages).map(([pageName, pageLink]) => (
          <Link key={pageName} to={pageLink}>
            <button className="border px-3 py-1 text-sm rounded text-blue-500">
              {pageName}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Test;
