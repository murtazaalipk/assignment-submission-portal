import React, { useState } from "react";

const TeacherClassView = ({ assignments }) => {
  const [selectedSection, setSelectedSection] = useState("view");

  return (
    <div>
      <div className="mx-20 my-10 font-[450]">
        <h2>Flutter</h2>
        <h2>Batch : 3</h2>
        <h2>Teacher ID : F-02</h2>
      </div>
      <div className="mx-20 my-10 shadow-lg font-signika text-[#4f4f4f]">
        <div className="p-4 shadow-sm">
          <div className="flex justify-between list-none gap-4">
            <div>
              <div
                className={`p-3 rounded cursor-pointer ${
                  selectedSection === "view" ? "bg-blue-200" : "bg-[#e3ebf8]"
                }`}
                onClick={() => setSelectedSection("view")}
              >
                <a>View Assignment</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`p-3 rounded cursor-pointer ${
                  selectedSection === "post" ? "bg-blue-200" : "bg-[#e3ebf8]"
                }`}
                onClick={() => setSelectedSection("post")}
              >
                <a>Post Assignment</a>
              </div>
              <div
                className={`p-3 rounded cursor-pointer ${
                  selectedSection === "report" ? "bg-blue-200" : "bg-[#e3ebf8]"
                }`}
                onClick={() => setSelectedSection("report")}
              >
                <a>Generate Report</a>
              </div>
            </div>
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
                  <td className="p-3">Grading</td>
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
                    <td className="p-3">{assignment.studentCount}</td>
                    <td className="p-3">
                      {assignment.gradingStatus === "pending" ? (
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
          {selectedSection === "post" && (
            <div>
              <h3>Post Assignment</h3>
            </div>
          )}
          {selectedSection === "report" && (
            <div>
              <h3>Generate Report</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassView;
