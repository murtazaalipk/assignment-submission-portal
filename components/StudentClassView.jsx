import React from 'react';

const StudentClassView = ({ assignments }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">Assignment</th>
            <th className="py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{assignment.name}</td>
              <td className="border px-4 py-2">{assignment.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentClassView;
