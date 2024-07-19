
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import TeacherClassView from "@/components/TeacherClassView";
import StudentClassView from "@/components/StudentClassView";
import { fetchUserByEmail } from "@/services/user"; // Adjust the import path based on your actual service location

// Mock data (can be moved to a separate file)
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
        Status: "complete",
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
        Status: "pending",
      },
      {
        name: "Assignment 2",
        dueDate: "2024-07-29",
        studentCount: 12,
        Status: "complete",
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
        Status: "pending",
      },
      {
        name: "Assignment 2",
        dueDate: "2024-08-01",
        studentCount: 8,
        Status: "complete",
      },
    ],
  },
];

export default function ClassDashboard() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // extract id
  const [userData, setUserData] = useState(null);
  const [course, setCourse] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session?.user?.email) {
          const fetchedUser = await fetchUserByEmail(session.user.email);
          setUserData(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const courseId = parseInt(id);
        if (!isNaN(courseId)) {
          const selectedCourse = courses.find((course) => course.id === courseId);
          setCourse(selectedCourse);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchUserData();
    if (id) {
      fetchCourse();
    }
  }, [id, session?.user?.email]);

  if (!id || !course || !userData) {
    return <div>Loading...</div>;
  }

  return userData.role === "teacher" ? (
    <TeacherClassView
      course={course.course}
      batch={course.batch}
      teacherId={course.id} // Adjust according to your fetched user data
      assignments={course.assignments}
    />
  ) : (
    <StudentClassView
      course={course.course}
      batch={course.batch}
      studentId={course.id} // Adjust according to your fetched user data
      assignments={course.assignments}
    />
  );
}