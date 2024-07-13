"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TeacherClassView from "@/components/TeacherClassView";
import StudentClassView from "@/components/StudentClassView";

export default function ClassDashboard() {
  const pathname = usePathname();
  const path = pathname;
  const id = path.split("/")[2]; // extract id
  console.log(id);
  const [userRole, setUserRole] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulate fetching user role and course data from your API or authentication context
    // For demonstration, setting role manually and fetching course data
    setUserRole("teacher"); // Change to 'student' to see student dashboard

    const fetchCourse = async () => {
      // Simulated fetched data
      const courses = [
        {
          id: 1,
          course: "Flutter",
          batch: "1",
          city: "Karachi",
          days: "Wed & Fri",
          status: true,
          assignments: [
            {
              name: "Assignment 1",
              dueDate: "2024-07-20",
              studentCount: 20,
              gradingStatus: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-07-27",
              studentCount: 18,
              gradingStatus: "complete",
            },
          ],
        },
        {
          id: 2,
          course: "Flutter",
          batch: "2",
          city: "Karachi",
          days: "Sat & Sun",
          status: false,
          assignments: [
            {
              name: "Assignment 1",
              dueDate: "2024-07-22",
              studentCount: 15,
              gradingStatus: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-07-29",
              studentCount: 12,
              gradingStatus: "complete",
            },
          ],
        },
        {
          id: 3,
          course: "Flutter",
          batch: "3",
          city: "Karachi",
          days: "Mon & Tue",
          status: false,
          assignments: [
            {
              name: "Assignment 1",
              dueDate: "2024-07-25",
              studentCount: 10,
              gradingStatus: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-08-01",
              studentCount: 8,
              gradingStatus: "complete",
            },
          ],
        },
      ];

      // Check if id is available and parse it as integer
      const courseId = parseInt(id);

      if (!isNaN(courseId)) {
        const selectedCourse = courses.find((course) => course.id === courseId);
        setCourse(selectedCourse);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!id || !course) {
    return <div>Loading...</div>;
  }

  if (userRole === "teacher") {
    return (
      <TeacherClassView
        course={course.course}
        batch={course.batch}
        teacherId="F-02" // Placeholder teacher ID
        assignments={course.assignments}
      />
    );
  } else if (userRole === "student") {
    return (
      <StudentClassView
        course={course.course}
        batch={course.batch}
        studentId="S-01" // Placeholder student ID
        assignments={course.assignments}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
}
