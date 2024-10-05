import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const EditUserModal = ({ isOpen, onClose, onUserUpdated, userData }) => {
  const [updatedUser, setUpdatedUser] = useState(userData || {});
  // State to hold error messages for validation
  const [nameError, setNameError] = useState('');
  const [companyError, setCompanyError] = useState('');

  useEffect(() => {
    console.log("User Data in Modal:", userData);
    setUpdatedUser(userData); 
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });

    // Resetting error states when input changes
    if (name === "name" && value.length < 3) {
      setNameError('Name must be at least 3 characters.');
    } else if (name === "name") {
      setNameError(''); // Clear error if validation passes
    }

    if (name === "companyName" && value.length < 3) {
      setCompanyError('Company Name must be at least 3 characters.');
    } else if (name === "companyName") {
      setCompanyError(''); // Clear error if validation passes
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for errors before submitting
    if (nameError || companyError || updatedUser.name.length < 3 || updatedUser.company?.name.length < 3) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then((response) => {
        onUserUpdated(response.data);
        onClose();
        toast.success('User updated successfully!');  // Success notification
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error updating user. Please try again.');  // Error notification
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black w-full bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll">
      <div className="bg-gray-900 h-fit text-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={updatedUser?.name}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${nameError ? 'border border-red-500' : ''}`}
              required
              placeholder="Enter Name"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={updatedUser?.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="phone"
              value={updatedUser?.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={updatedUser?.username}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Street <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="street"
              value={updatedUser?.address?.street}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, street: e.target.value } })}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Street"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="city"
              value={updatedUser?.address?.city}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, city: e.target.value } })}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter City"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Suite</label>
            <input
              type="text"
              name="suite"
              value={updatedUser?.address?.suite}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, suite: e.target.value } })}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Suite"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={updatedUser?.address?.zipcode}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, zipcode: e.target.value } })}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Zipcode"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={updatedUser?.website}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Website"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={updatedUser?.company?.name}
              onChange={(e) => {
                setUpdatedUser({ ...updatedUser, company: { name: e.target.value } });
                if (e.target.value.length < 3) {
                  setCompanyError('Company Name must be at least 3 characters.');
                } else {
                  setCompanyError(''); // Clear error if validation passes
                }
              }}
              className={`w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${companyError ? 'border border-red-500' : ''}`}
              placeholder="Enter Company Name"
            />
            {companyError && <p className="text-red-500 text-sm mt-1">{companyError}</p>}
          </div>
          <div className="flex justify-between gap-2 col-span-2">
            <button
              type="submit"
              className="bg-teal-600 w-full hover:bg-teal-500 text-white px-5 py-2 rounded transition-all"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 w-full hover:bg-red-500 text-white px-5 py-2 rounded transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
