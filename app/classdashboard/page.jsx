"use client";

import Classes from "@/components/classes";
import Task from "@/components/Task";
import { useSession } from "next-auth/react";

export default function classDashboard() {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 mb-8">
            Web And App - Saturday & Sunday - Batch 9
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
            <Task message={"Post Assignment"} />
            <Task message={"View Class"} />
            <Task message={"Create Student Report"} />
          </div>
        </>
    );
}
