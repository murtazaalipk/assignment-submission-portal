"use client"
import { useState } from 'react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    cnic: '',
    classId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/addStudent?classId=${formData.classId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cnic: formData.cnic }),
    });
    const data = await response.json();
    if (data.success) {
        alert('API call was successful!');
        console.log(data); // Handle the data from the API here
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Student to Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="cnic">CNIC</label>
          <input className="w-full p-2 border" type="text" id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="classId">Class ID</label>
          <input className="w-full p-2 border" type="text" id="classId" name="classId" value={formData.classId} onChange={handleChange} />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
