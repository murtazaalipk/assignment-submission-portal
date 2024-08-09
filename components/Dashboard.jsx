"use client";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import Link from "next/link";
import Loader from "./Loader";
import { useSession } from "next-auth/react";

export default function Dashboard({}) {
  const { data: session } = useSession();
  const userData = session?.user;
  const [courses, setCourses] = useState([]);

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchClasses = async () => {
      const fetchedClasses = await (
        await fetch(`/api/classes?email=${userData.email}`)
      ).json();
      setCourses(fetchedClasses.classes);
    };

    if (userData) {
      fetchClasses();
    }
  }, [userData]);

  if (!userData) {
    return <Loader />;
  }

  const { role, name } = userData;

  return (
    <>
      <h1
        className="text-[#5b6571] text-lg font-signika pl-20 mt-10 mb-10"
        dangerouslySetInnerHTML={{
          __html:
            role === "student"
              ? `Hi! ${name} 👋<br> Welcome to the SMIT student portal. You can find all your courses listed below`
              : `Hi! Sir ${name} 👋<br> Welcome to the SMIT Teacher portal. You can find all your courses listed below.`,
        }}
      />
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
