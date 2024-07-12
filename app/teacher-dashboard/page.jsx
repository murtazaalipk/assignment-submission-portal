"use client";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TeacherDashboard() {
    const { data: session } = useSession();
    const [courses, setCourses] = useState([]);

    // Simulate fetching data from a database
    useEffect(() => {
        const fetchCourses = async () => {
            // Simulated fetched data
            const fetchedCourses = [
                { course: "Flutter", batch: "1", city: "Karachi", days: "Wed & Fri", status: true },
                { course: "Flutter", batch: "2", city: "Karachi", days: "Sat & Sun", status: false },
                { course: "Flutter", batch: "3", city: "Karachi", days: "Mon & Tue", status: false },
            ];
            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 mb-8">
                Hey Sir {session?.user?.name}, Welcome Back
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                {courses.map((course, index) => (
                    <Link
                        key={index}
                        href={{
                            pathname: "/class-dashboard",
                            query: {
                                course: course.course,
                                batch: course.batch,
                                city: course.city,
                                days: course.days,
                                status: course.status,
                            },
                        }}
                        passHref
                    >
                        <Cart {...course} />
                    </Link>
                ))}
            </div>
        </>
    );
}
