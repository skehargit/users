import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";
import EditUserModal from "../components/EditUserModal";
import { Toaster, toast } from 'react-hot-toast';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error While Fetching data!"); // Error notification
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("User deleted successfully!"); // Success notification
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error While deleting user!"); // Error notification
          setLoading(false);
        });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setShowEditPopup(true); // Open edit modal
  };

  const handleUpdate = (updatedUser) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? response.data : user
        );
        setUsers(updatedUsers);
        toast.success("User updated successfully!"); // Success notification
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error While updating user!"); // Error notification
      });
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">User Management</h1>

      {/* Search Field */}
      <div className="w-full max-w-4xl items-center grid gap-2 grid-cols-2 max-[900px]:grid-cols-1 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, username, or number"
          className="p-2 text-black rounded-lg w-full max-w-4xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          onClick={() => setShowPopup(true)}
          className="bg-teal-600 flex items-center justify-center text-white font-semibold rounded-lg cursor-pointer p-2 w-full max-w-4xl text-md hover:underline"
        >
          + Add New User
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          {/* Table Headers */}
          <div className="hidden sm:grid grid-cols-4 bg-teal-600 p-4 text-xs sm:text-sm md:text-base font-semibold text-white">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Actions</div>
          </div>

          {/* Table Rows (Responsive Grid) */}
          {loading ? (
            <div className="text-center p-4">
              {/* Circular Spinner */}
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-400 border-solid"></div>
              </div>
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 ${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600 text-gray-200`}
              >
                {/* Name */}
                <div className="sm:text-base text-xs">
                  <span className="sm:hidden font-semibold">Name: </span>
                  {user.name}
                </div>

                {/* Email */}
                <div className="sm:text-base text-xs">
                  <span className="sm:hidden font-semibold">Email: </span>
                  {user.email}
                </div>

                {/* Phone */}
                <div className="sm:text-base text-xs">
                  <span className="sm:hidden font-semibold">Phone: </span>
                  {user.phone}
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-row sm:justify-start justify-between items-center space-x-2">
                  <button
                    className="bg-teal-500 w-full text-white px-3 py-1 rounded-lg hover:bg-teal-400 transition-all duration-200 ease-in-out"
                    onClick={() =>
                      navigate(`/users/${user.id}`, { state: { user } })
                    }
                  >
                    View
                  </button>

                  <button
                    className="bg-yellow-500 w-full text-white px-3 py-1 rounded-lg hover:bg-yellow-400 transition-all duration-200 ease-in-out"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 w-full text-white px-3 py-1 rounded-lg hover:bg-red-400 transition-all duration-200 ease-in-out"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Popup */}
      <UserModal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onUserAdded={handleUserAdded}
      />
      
      {selectedUser&&<EditUserModal
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        userData={selectedUser}
        onUserUpdated={handleUpdate}
      />}
    </div>
  );
};

export default Home;
