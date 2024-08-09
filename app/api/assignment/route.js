import { connectMongoDB } from "@/lib/mongodb";
import { createAssignment, getAssignments } from "../../../services/assignment";
import { NextResponse } from "next/server";

/**
 * Handles POST request to create a new assignment.
 * @param {Object} req - The request object.
 * @param {string} req.json.title - The title of the assignment.
 * @param {string} req.json.description - The description or instructions for the assignment.
 * @param {Date} req.json.dueDate - The due date of the assignment.
 * @param {string} req.json.teacherId - The id of the teacher creating the assignment.
 * @returns {Promise<Object>} The JSON response indicating success or failure.
 */
export async function POST(req) {
  try {
    // Extract title, description, dueDate, and teacherId from request body
    const { title, description, dueDate } = await req.json();

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    // Connect to MongoDB
    await connectMongoDB();

    // Create the assignment
    const assignment = await createAssignment({
      classId,
      title,
      description,
      dueDate,
    });

    // Return success response
    return NextResponse.json(
      { success: true, message: "Assignment posted", assignment },
      { status: 201 }
    );
  } catch (error) {
    // Log and handle errors
    console.error("Exception occurred while posting assignment:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while posting assignment" },
      { status: 500 }
    );
  }
}

/**
 * Handles GET request to fetch assignments by teacher email.
 * @param {Object} req - The request object.
 * @param {string} req.url - The URL of the request containing query parameters.There should be a teacher's email in query e.g: ?teacherId:example@123.com
 * @returns {Promise<Object>} The JSON response containing assignments or error message.
 */
export async function GET(req) {
  try {
    // Parse the query parameters (assuming teacherId is passed as a query parameter)
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    // Connect to MongoDB
    await connectMongoDB();

    // Fetch the assignments
    const assignments = await getAssignments({ classId });

    // Return success response
    return NextResponse.json({ success: true, assignments }, { status: 200 });
  } catch (error) {
    // Log and handle errors
    console.error("Exception occurred while fetching assignments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching assignments",
      },
      { status: 500 }
    );
  }
}
