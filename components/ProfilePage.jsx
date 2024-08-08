"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
// import ChangePasswordForm from './ChangePasswordForm';
const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p>You are not signed in. Please sign in to view your profile.</p>
        <button
          onClick={() => signIn()}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </div>
    );
  }

  const user = session.user;

  const handleChangePassword = () => {
    // Implement password change logic here
    alert("Change Password button clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4 flex">
          <label className="block text-gray-700 font-bold">Name: &nbsp; </label>
          <p className="text-gray-900"> {user.name}</p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 font-bold">
            Email: &nbsp;{" "}
          </label>
          <p className="text-gray-900 ">{user.email}</p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 font-bold">CNIC: &nbsp; </label>
          <p className="text-gray-900">{user.cnic}</p>
        </div>
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Change Password
        </button>
        <button
          onClick={() => signOut()}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
