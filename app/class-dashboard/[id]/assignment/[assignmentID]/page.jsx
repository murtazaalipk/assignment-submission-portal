"use client";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import AssignmentDetailForTeacher from "@/components/AssignmentDetailForTeacher";
import AssignmentDetailForStudent from "@/components/AssignmentDetailForStudent";

export default function AssignmentDetailPage() {
    const pathname = usePathname();
    const id = pathname.split("/")[2]; // Extract classId from the path
    const assignmentID = pathname.split("/")[4]; // Extract assignmentId from the path
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const role = session?.user?.role;

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`/api/assignment?classId=${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch assignments");
                }
                const data = await response.json();
                const assignmentsArray = data.assignments || []; // Ensure it's an array

                const selectedAssignment = assignmentsArray.find((assignment) => assignment._id === assignmentID);
                setAssignment(selectedAssignment);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (id && assignmentID) {
            fetchAssignment();
        }
    }, [id, assignmentID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    return role === "teacher" ? (
        <AssignmentDetailForTeacher assignment={assignment} />
    ) : (
        <AssignmentDetailForStudent assignment={assignment} />
    );
}
