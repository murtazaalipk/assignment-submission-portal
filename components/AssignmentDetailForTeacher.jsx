"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "./Loader";

const AssignmentDetail = ({ assignment }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      // Simulated student data
      const studentData = [
        {
          id: 1,
          name: "Murtaza Ali",
          submitted: true,
          link: "http://example.com/1",
        },
        { id: 2, name: "Farhan Shafi", submitted: false, link: "" },
        {
          id: 3,
          name: "Syed Zohaib",
          submitted: true,
          link: "http://example.com/3",
        },
      ];
      setStudents(studentData);
    };

    fetchStudents();
  }, []);
  const date = new Date(assignment.dueDate);
  const dueDate = date.toDateString();

  return (
    <div className="p-20">
      <h2>{assignment.name}</h2>
      <h3>Due Date: {dueDate}</h3>
      <h4>Student Count: {assignment.studentCount}</h4>

      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="p-3">Student Name</th>
            <th className="p-3">Submitted</th>
            <th className="p-3">Link</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.submitted ? "Yes" : "No"}</td>
              <td className="p-3">
                {student.link ? (
                  <a
                    href={student.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Submission
                  </a>
                ) : (
                  "Not Submitted"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function AssignmentDetailPage({assignment}) {
  const pathname = usePathname();
  const [courseId, assignmentId] = pathname.split("/").slice(3, 5); // extract courseId and assignmentId from URL
  const { data: session } = useSession();

  if (!assignment) {
    return <Loader />;
  }

  return <AssignmentDetail assignment={assignment} />;
}
