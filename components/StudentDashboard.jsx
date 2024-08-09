"use client";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const email = session?.user?.email;

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await (
        await fetch(`/api/classes?email=${email}`)
      ).json();
      setCourses(fetchedCourses.classes);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 className=" text-[#5b6571] text-lg font-signika pl-20 mt-10 mb-10">
        Hi! {session?.user?.name}👋<br></br> Welcome to the SMIT student portal.
        You can find all your courses listed below
      </h1>
      <div className="flex flex-wrap justify-start px-20 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/class-dashboard/${course._id}`}
            passHref
          >
            <Cart {...course} />
          </Link>
        ))}
      </div>
    </>
  );
}
