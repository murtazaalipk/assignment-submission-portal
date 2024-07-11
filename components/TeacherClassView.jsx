import React from 'react';

const TeacherClassView = ({ assignments }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">Assignment</th>
            <th className="py-2">Due Date</th>
            <th className="py-2">Student Count</th>
            <th className="py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{assignment.name}</td>
              <td className="border px-4 py-2">{assignment.dueDate}</td>
              <td className="border px-4 py-2">{assignment.studentCount}</td>
              <td className="border px-4 py-2">
                {/* Add logic to grade students */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClassView;
