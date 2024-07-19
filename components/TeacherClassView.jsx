import React, { useState } from "react";
import Link from "next/link";

const TeacherClassView = ({ course, batch, teacherId, assignments }) => {
  const [selectedSection, setSelectedSection] = useState("view");

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
              {/* Post assignment form or functionality */}
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
