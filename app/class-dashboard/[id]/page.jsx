"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import TeacherClassView from "@/components/TeacherClassView";
import StudentClassView from "@/components/StudentClassView";
import { fetchUserByEmail } from "@/services/user"; // Adjust the import path based on your actual service location
import Loader from "@/components/Loader";

export default function ClassDashboard() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // extract id
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/classes?email=${session?.user?.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
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

    if (session?.user?.email) {
      fetchCourses();
    }
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const course = courses.find((course) => course._id === id);

  if (!course || !session) {
    return <div>No data available</div>;
  }
  return session?.user?.role === "teacher" ? (
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
