"use client";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchCourses = async () => {
      // Simulated fetched data
      const fetchedCourses = [
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
              Status: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-07-27",
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
              Status: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-07-29",
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
              Status: "pending",
            },
            {
              name: "Assignment 2",
              dueDate: "2024-08-01",
              Status: "complete",
            },
          ],
        },
      ];
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 className=" text-[#5b6571] text-lg font-signika pl-20 mt-10 mb-10">
        Hi! {session?.user?.name}👋<br></br> Welcome to the SMIT student portal. You can find all your courses listed below
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/class-dashboard/${course.id}`} passHref>
            <Cart {...course} />
          </Link>
        ))}
      </div>
    </>
  );
}