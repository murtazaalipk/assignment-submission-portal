"use client"
import { useState } from 'react';

const AddClass = () => {
  const [formData, setFormData] = useState({
    title: '',
    teacherId: '',
    batch: '',
    city: '',
    days: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
        alert('API call was successful!');
        console.log(data); // Handle the data from the API here
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input className="w-full p-2 border" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="teacherId">Teacher ID</label>
          <input className="w-full p-2 border" type="text" id="teacherId" name="teacherId" value={formData.teacherId} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="batch">Batch</label>
          <input className="w-full p-2 border" type="text" id="batch" name="batch" value={formData.batch} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
          <input className="w-full p-2 border" type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="days">Days</label>
          <input className="w-full p-2 border" type="text" id="days" name="days" value={formData.days} onChange={handleChange} />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
