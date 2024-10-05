import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

const UserModal = ({ isOpen, onClose, onUserAdded, existingUser }) => {
  // State to hold the new user details
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    website: "",
    company: {
      name: "",
    },
  });

  // State to hold error messages for validation
  const [nameError, setNameError] = useState('');
  const [companyError, setCompanyError] = useState('');

  // Effect to populate existing user data for editing
  useEffect(() => {
    if (existingUser) {
      setNewUser({
        name: existingUser.name || "",
        email: existingUser.email || "",
        phone: existingUser.phone || "",
        username: existingUser.username || "",
        address: {
          street: existingUser.address?.street || "",
          suite: existingUser.address?.suite || "",
          city: existingUser.address?.city || "",
          zipcode: existingUser.address?.zipcode || "",
        },
        website: existingUser.website || "",
        company: {
          name: existingUser.company?.name || "",
        },
      });
    }
  }, [existingUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update user state based on input name
    setNewUser({ ...newUser, [name]: value });

    //  Check if the name is more than 3 characters
    if (name === 'name' && value.length < 3) {
      setNameError('Name must be at least 3 characters.');
    } else {
      setNameError(''); // Clear error if validation passes
    }

    // Validation for company name
    if (name === 'companyName' && value.length < 3) {
      setCompanyError('Company Name must be at least 3 characters.'); // Set error message if validation fails
    } else {
      setCompanyError(""); // Clear error if validation passes
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    newUser.username = `USER-${newUser.name}`; // Set username based on the name input

    // Make API call to add new user
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        onUserAdded(response.data); // Notify parent component about the new user
        onClose(); // Close modal
        toast.success('User added successfully!'); // Success notification
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding user. Please try again.'); // Error notification
      });
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black w-full bg-opacity-50 flex justify-center md:items-center z-50 overflow-y-scroll">
      <div className="absolute bg-black/50 backdrop-blur  h-screen w-screen top-0 z-[1]"></div>
      <div className="relative z-[2] bg-gray-900 h-fit text-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-center">
          {existingUser ? "Edit User" : "Add New User"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              minLength={3}
              placeholder="Enter Name"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Email"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Phone Number"
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={
                existingUser
                  ? newUser.username
                  : `USER-${newUser.name.split(" ").join("-")}`
              }
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              minLength={3}
              readOnly={existingUser} // Make username non-editable when editing
              placeholder="USER-Name"
            />
          </div>

          {/* Address Inputs */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="street"
              value={newUser.address.street}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, street: e.target.value },
                })
              }
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Street"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={newUser.address.city}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, city: e.target.value },
                })
              }
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
              value={newUser.address.suite}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, suite: e.target.value },
                })
              }
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Suite"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={newUser.address.zipcode}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, zipcode: e.target.value },
                })
              }
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Zipcode"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={newUser.website}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Website"
            />
          </div>

          {/* Company Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={newUser.company.name}
              onChange={(e) => {
                const value = e.target.value;
                setNewUser({
                  ...newUser,
                  company: { name: value },
                });
                // Validation for company name
                if (value.length < 3) {
                  setCompanyError('Company Name must be at least 3 characters.'); // Set error message if validation fails
                } else {
                  setCompanyError(""); // Clear error if validation passes
                }
              }}
              className="w-full p-3 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter Company Name"
            />
            {companyError && <p className="text-red-500 text-sm mt-1">{companyError}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-4 flex gap-2 w-full col-span-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-300"
              disabled={nameError || companyError} // Disable button if there are errors
            >
              Add User
            </button>
            <button
             onClick={onClose}
              className="w-full py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Cancle
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default UserModal;
