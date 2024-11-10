import React, { useState } from "react";
import { getAuth } from "firebase/auth";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  if (!user) {
    return null; 
  }

  const { displayName, photoURL } = user;

  return (
    <>
      <button
        className="flex items-center cursor-pointer relative"
        onClick={handleClick}
      >
        <p className="text-gray-800 font-medium">{displayName}</p>
        <img
          className="ml-2 w-6 h-6 rounded-full"
          alt="avatar"
          src={photoURL}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
