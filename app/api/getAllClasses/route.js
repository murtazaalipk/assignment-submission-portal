import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getAllClasses } from "../../../services/class";

/**
 * Handles GET requests to fetch all classes.
 *
 * @returns {Promise<NextResponse>} - The response object with all class IDs and names.
 */
export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all classes
    const classes = await getAllClasses();

    // Return success response with classes data
    return NextResponse.json({ success: true, classes }, { status: 200 });
  } catch (error) {
    // Log and handle errors
    console.error("Exception occurred while fetching classes:", error);
    return NextResponse.json({ success: false, message: error.message || "An error occurred while fetching classes" }, { status: 500 });
  }
}
