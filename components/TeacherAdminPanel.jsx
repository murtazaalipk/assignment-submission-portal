"use client";
import React, { useState } from 'react';

const TeacherAdminPanel = () => {
  const [user, setUser] = useState({
    title: '',
    teacherId: '',
    batch: '',
    city: '',
    days: [],
  });

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleDaysChange = (event) => {
    const { options } = event.target;
    const selectedDays = [];
    for (const option of options) {
      if (option.selected) {
        selectedDays.push(option.value);
      }
    }
    setUser({
      ...user,
      days: selectedDays,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(user);
    alert('User Added Successfully!');
    // Reset form
    setUser({
      title: '',
      teacherId: '',
      batch: '',
      city: '',
      days: [],
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8  rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-4">
          Add Class 
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-600 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={user.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="teacherId"
              className="block text-gray-600 font-semibold mb-2"
            >
              Teacher ID
            </label>
            <input
              type="text"
              name="teacherId"
              id="teacherId"
              value={user.teacherId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the teacher ID"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="batch"
              className="block text-gray-600 font-semibold mb-2"
            >
              Batch
            </label>
            <input
              type="text"
              name="batch"
              id="batch"
              value={user.batch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the batch"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-600 font-semibold mb-2"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={user.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the city"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="days"
              className="block text-gray-600 font-semibold mb-2"
            >
              Days
            </label>
            <select
              name="days"
              id="days"
              value={user.days}
              onChange={handleDaysChange}
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherAdminPanel;