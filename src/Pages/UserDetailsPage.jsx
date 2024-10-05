import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const UserDetailsPage = () => {
  const { state } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(state.user);
    console.log(state.user)
  }, []);


  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">User Details</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Name:</h2>
            <p>{user.name}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Username:</h2>
            <p>{user.username}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Email:</h2>
            <p>{user.email}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Phone:</h2>
            <p>{user.phone}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Website:</h2>
            <p>{user.website}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Company:</h2>
            <p>{user.company.name}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-teal-400 font-semibold">Address:</h2>
            <p>
              {user.address.street}, {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
