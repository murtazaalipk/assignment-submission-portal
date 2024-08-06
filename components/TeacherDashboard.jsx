"use client";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import Link from "next/link";
// import { getClass } from "@/services/class";

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const email = session?.user?.email

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchCourses = async () => {
    const fetchedCourses = await (await fetch(`http://localhost:3000/api/classes?email=${email}`)).json()
    setCourses(fetchedCourses.classes)
  };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 className=" text-[#5b6571] text-lg font-signika pl-20 mt-10 mb-10">
        Hi! Sir {session?.user?.name}👋<br /> Welcome to the SMIT Teacher portal. You can find all your courses listed below.
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {courses.map((course) => (
          <Link key={course._id} href={`/class-dashboard/${course._id}`} passHref>
            <Cart {...course} />
          </Link>
        ))}
      </div>
    </>
  );
}
