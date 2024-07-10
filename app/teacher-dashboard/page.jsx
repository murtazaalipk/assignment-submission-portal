"use client";
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TeacherDashboard() {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 mb-8">
                Hey Sir {session?.user?.name}, Welcome Back
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href={{ pathname: "/class-dashboard", query: { course: "Flutter", batch: "1", city: "Karachi", days: "Wed & Fri", status: true } }} passHref>
                    <Cart course={"Flutter"} batch={"1"} city={"Karachi"} days={"Wed & Fri"} status={true} />
                </Link>
                <Link href={{ pathname: "/class-dashboard", query: { course: "Flutter", batch: "2", city: "Karachi", days: "Sat & Sun", status: false } }} passHref>
                    <Cart course={"Flutter"} batch={"2"} city={"Karachi"} days={"Sat & Sun"} status={false} />
                </Link>
                <Link href={{ pathname: "/class-dashboard", query: { course: "Flutter", batch: "3", city: "Karachi", days: "Mon & Tue", status: false } }} passHref>
                    <Cart course={"Flutter"} batch={"3"} city={"Karachi"} days={"Mon & Tue"} status={false} />
                </Link>
            </div>
        </>
    );
}

