"use client";

import Classes from "@/components/classes";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function TeacherDashboard() {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 mb-8">
                Hey Sir Nadir, Welcome Back
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                <Classes title={"Web And App"} days={"Saturday Sunday"} batch={"8"} timings={"2:00-4:00"} />
                <Classes title={"Web And App"} days={"Monday Tuesday"} batch={"9"} timings={"2:00-4:00"} />
                <Classes title={"Web And App"} days={"Wednesday Thursday"} batch={"10"} timings={"2:00-4:00"} />
            </div>
        </>
    );
}
