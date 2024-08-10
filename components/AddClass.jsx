"use client";
import { useState, useEffect } from "react";

const AddClass = () => {
  const [formData, setFormData] = useState({
    title: "",
    teacherId: "",
    batch: "",
    city: "",
    days: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  useEffect(() => {
    // Fetch teachers data
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/getAllTeachers");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

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
      setAlert({ message: "Successfully Created class", type: "success" });
    } else {
      setAlert({ message: "Failed to add student", type: "error" });
    }
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
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
            Teacher
          </label>
          <select
            className="w-full p-2 border"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
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
      {alert.message && (
        <div
          className={`mt-4 p-4 rounded-md text-center transition-opacity duration-300 ${
            alert.type === "success"
              ? "bg-green-100 text-green-800 opacity-100"
              : "bg-red-100 text-red-800 opacity-100"
          }`}
          style={{ opacity: alert.message ? 1 : 0 }}
        >
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default AddClass;
