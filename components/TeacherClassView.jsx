import React, { useState } from "react";
import Link from "next/link";

const TeacherClassView = ({ course, batch, teacherId, assignments }) => {
  const [selectedSection, setSelectedSection] = useState("view");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/assignment?classId=${batch}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Assignment posted successfully!");
        // Clear the form
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        setMessage("Failed to post assignment.");
      }
    } catch (error) {
      console.error("Error posting assignment:", error);
      setMessage("An error occurred while posting the assignment.");
    }
  };

  return (
    <div>
      <div className="mx-20 my-10 font-[450]">
        <h2>{course}</h2>
        <h2>Batch : {batch}</h2>
        <h2>Teacher ID : {teacherId}</h2>
      </div>
      <div className="mx-20 my-10 shadow-lg font-signika text-[#4f4f4f]">
        <div className="p-4 shadow-sm">
          <div className="flex list-none gap-4">
            <button
              className={`p-3 rounded ${selectedSection === "view" ? "bg-blue-200" : "bg-[#e3ebf8]"}`}
              onClick={() => setSelectedSection("view")}
            >
              View Assignment
            </button>
            <button
              className={`p-3 rounded ${selectedSection === "post" ? "bg-blue-200" : "bg-[#e3ebf8]"}`}
              onClick={() => setSelectedSection("post")}
            >
              Post Assignment
            </button>
            <button
              className={`p-3 rounded cursor-not-allowed ${selectedSection === "report" ? "bg-blue-200" : "bg-[#e3ebf8]"}`}
              onClick={() => setSelectedSection("report")}
            >
              Generate Report
            </button>
          </div>
        </div>

        <div className="p-4">
          {selectedSection === "view" && (
            <table className="min-w-full bg-white no-underline">
              <thead>
                <tr>
                  <td className="p-3">Assignment</td>
                  <td className="p-3">Due Date</td>
                  <td className="p-3">Student Count</td>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr className="bg-[#e3ebf8] border border-[#cdcb]" key={index} style={{ cursor: 'pointer' }}>
                    <td className="p-3">
                      <Link href={`/class-dashboard/${teacherId}/assignment/${index + 1}`} passHref>
                        {assignment.name}
                      </Link>
                    </td>
                    <td className="p-3">{assignment.dueDate}</td>
                    <td className="p-3">{assignment.studentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedSection === "post" && (
            <div>
              <h3>Post Assignment</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="dueDate">
                    Due Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          )}
          {selectedSection === "report" && (
            <div>
              <h3>Generate Report</h3>
              {/* Report generation functionality */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassView;
