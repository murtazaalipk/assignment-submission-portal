"use client";
import React, { useState } from "react";

const TeacherClassView = ({ course, batch, studentId, assignments }) => {
  const [selectedSection, setSelectedSection] = useState("view");

  return (
    <div>
      <div className="mx-20 my-10 font-[450]">
        <h2>{course}</h2>
        <h2>Batch : {batch}</h2>
        <h2>Roll NO : {studentId}</h2>
      </div>
      <div className="mx-20 my-10 shadow-lg font-signika text-[#4f4f4f]">
        <div className="p-4 shadow-sm">
          <div className="flex gap-4">
            <button
              className={`p-3 rounded ${
                selectedSection === "view" ? "bg-blue-200" : "bg-[#e3ebf8]"
              }`}
              onClick={() => setSelectedSection("view")}
            >
              View Assignment
            </button>
             <button
              className={`p-3 rounded cursor-not-allowed ${
                selectedSection === "pending" ? "bg-blue-200" : "bg-[#e3ebf8]"
              }`}
              onClick={() => setSelectedSection("pending")}
            >
              Pending Assignment
            </button>
            <button
              className={`p-3 rounded cursor-not-allowed ${
                selectedSection === "submitted" ? "bg-blue-200" : "bg-[#e3ebf8]"
              }`}
              onClick={() => setSelectedSection("submitted")}
            >
              Submitted Assignment
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
                  <td className="p-3">Status</td>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr
                    className="bg-[#e3ebf8] border border-[#cdcb]"
                    key={index}
                  >
                    <td className="p-3">{assignment.name}</td>
                    <td className="p-3">{assignment.dueDate}</td>
                    <td className="p-3">
                      {assignment.Status === "pending" ? (
                        <button className="bg-green-300 font-bold w-16 text-green-900 mt-2 px-2 py-1 rounded-full text-[12px]">
                          Pending
                        </button>
                      ) : (
                        <button className="bg-blue-300 font-bold w-16 text-blue-800 mt-2 px-2 py-1 rounded-full text-[12px]">
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedSection === "pending" && (
            <div>
              <h3>Pending Assignment</h3>
              {/* Post assignment form or functionality */}
            </div>
          )}
          {selectedSection === "submitted" && (
            <div>
              <h3>Submitted Assignment</h3>
              {/* Report generation functionality */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassView;
