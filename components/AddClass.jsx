"use client";
import { useState } from "react";

const AddClass = () => {
  const [formData, setFormData] = useState({
    title: "",
    teacherId: "",
    batch: "",
    city: "",
    days: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let selectedDays = formData.days ? formData.days.split(" & ") : [];

    if (checked) {
      selectedDays.push(value);
    } else {
      selectedDays = selectedDays.filter((day) => day !== value);
    }

    setFormData({ ...formData, days: selectedDays.join(" & ") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert("Class Created successful!");
      console.log(data); // Handle the data from the API here
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="teacherId">
            Teacher ID
          </label>
          <input
            className="w-full p-2 border"
            type="text"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="batch">
            Batch
          </label>
          <input
            className="w-full p-2 border"
            type="text"
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="city">
            City
          </label>
          <input
            className="w-full p-2 border"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Days</label>
          <div className="">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="flex items-center">
                <input
                  className="mr-1"
                  type="checkbox"
                  id={day}
                  name="days"
                  value={day}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
