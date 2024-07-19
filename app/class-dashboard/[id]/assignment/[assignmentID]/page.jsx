"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';
import AssignmentDetail from "@/components/AssignmentDetail";

export default function AssignmentDetailPage() {
    const pathname = usePathname();
    const [courseId, assignmentId] = pathname.split("/").slice(3, 5); // extract courseId and assignmentId from URL
    const [assignment, setAssignment] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchAssignment = async () => {
            // Simulate fetching assignment data by ID
            const assignments = [
                {
                    id: 1,
                    name: "Assignment 1",
                    dueDate: "2024-07-20",
                    studentCount: 20,
                },
                {
                    id: 2,
                    name: "Assignment 2",
                    dueDate: "2024-07-27",
                    studentCount: 18,
                },
            ];
            const selectedAssignment = assignments.find((assignment) => assignment.id === parseInt(assignmentId));
            setAssignment(selectedAssignment);
        };

        if (assignmentId) {
            fetchAssignment();
        }
    }, [assignmentId]);

    if (!assignment) {
        return <div>Loading...</div>;
    }

    return <AssignmentDetail assignment={assignment} />;
}
