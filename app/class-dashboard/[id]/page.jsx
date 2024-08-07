"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';
import TeacherClassView from "@/components/TeacherClassView";
import StudentClassView from "@/components/StudentClassView";
import { fetchUserByEmail } from "@/services/user"; // Adjust the import path based on your actual service location

export default function ClassDashboard() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // extract id
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setError(error.message);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/classes?email=${session?.user?.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const fetchedCourses = await response.json();
        setCourses(fetchedCourses.classes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
    if (session?.user?.email) {
      fetchCourses();
    }
  }, [session?.user?.email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const course = courses.find(course => course._id === id);

  if (!course || !userData) {
    return <div>No data available</div>;
  }
  return userData.role === "teacher" ? (
    <TeacherClassView
      course={course.title}
      batch={course.batch}
      teacherId={course.teacher} // Adjust according to your fetched user data
      classId={id}
    />
  ) : (
    <StudentClassView
      course={course.title}
      batch={course.batch}
      studentId={course.student} // Adjust according to your fetched user data
      classId={id}
    />
  );
}
