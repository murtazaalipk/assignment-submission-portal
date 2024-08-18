"use client"
import { useEffect, useState } from 'react';
import ConfirmModal from './ConfrimModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/getAllUsers')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/deleteUser?id=${selectedUserId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Close the modal and update the UI by refetching the users
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Cnic</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 text-center px-4 border">{user.cnic}</td>
              <td className="py-2 text-center px-4 border">{user.name}</td>
              <td className="py-2 text-center px-4 border">{user.email}</td>
              <td className="py-2 text-center px-4 border">{user.role}</td>
              <td className="py-2 text-center px-4 border">
                <button
                  onClick={() => openDeleteModal(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default UserList;
