import { addStudent } from "../../../services/student";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

/**
 * Handles POST request to add a student to a class.
 * @param {Object} req - The request object containing body and URL parameters.
 * @param {Object} req - should contain cnic of student.
 * @returns {Object} JSON response indicating success or failure of adding student.
 */
export async function POST(req) {
    try {
        // Extract CNIC from request body
        const { cnic } = await req.json();

        // Extract classId from URL search parameters
        const { searchParams } = new URL(req.url);
        const classId = searchParams.get("classId");

        // Connect to MongoDB
        await connectMongoDB();

        // Call addStudent service function to add student to class
        await addStudent({ cnic, classId });

        // Return success response
        return NextResponse.json(
            { success: true, message: "Student added to class successfully" },
            { status: 201 }
        );
    } catch (error) {
        // Handle errors
        console.error("Error in adding student to class:\n", error);
        return NextResponse.json(
            { success: false, message: "Error in adding student to class" },
            { status: 500 }
        );
    }
}
