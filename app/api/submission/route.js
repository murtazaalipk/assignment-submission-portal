import { connectMongoDB } from "@/lib/mongodb";
import { submitAssignment } from "@/services/submission";
import { NextResponse } from "next/server";

/**
 * Handles POST request to submit an assignment.
 * @param {Object} req - The request object.
 * @param {Object} req.json - The parsed JSON body of the request.
 * @param {string} req.json.assignment_id - The ID of the assignment to submit.
 * @param {string} req.json.student_id - The ID of the student submitting the assignment.
 * @param {string} req.json.url - The URL where the submitted assignment can be accessed.
 * @returns {Promise<Object>} The JSON response indicating success or failure.
 */
export async function POST(req) {
    try {
        // Extract assignment_id, student_id, and url from request body
        const { assignment_id, student_id, url } = await req.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Call method to submit assignment
        const submittedAssignment = await submitAssignment({ assignment_id, student_id, url });

        // Return success response
        return NextResponse.json({ success: true, message: "Submitted successfully", submittedAssignment }, { status: 200 });

    } catch (error) {
        // Log and handle errors
        console.error("Exception occurred while submitting assignment:", error);
        return NextResponse.json({ success: false, message: "An error occurred while submitting assignments" }, { status: 500 });
    }
}
