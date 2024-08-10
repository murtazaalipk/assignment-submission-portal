"use client";
import { useState, useEffect } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    classId: "",
  });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch the list of classes when the component mounts
    const fetchClasses = async () => {
      const response = await fetch('/api/getAllClasses'); // Update this endpoint if necessary
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes); // Assuming `data.classes` contains the list of classes
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/addstudent?classId=${formData.classId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnic: formData.cnic }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Successfully added student to class");
      console.log(data); // Handle the data from the API here
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Student to Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="cnic">
            CNIC
          </label>
          <input
            className="w-full p-2 border"
            type="text"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="classId">
            Class
          </label>
          <select
            className="w-full p-2 border"
            id="classId"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.title} - Batch {cls.batch}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
