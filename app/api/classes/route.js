import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { createClass , getClass } from "../../../services/class";

/**
 * API endpoint to handle POST requests for creating a new class.
 * 
 * @param {Request} req - The incoming request object.
 * @param {string} req.json.title - The title of the class.
 * @param {string} req.json.teacherId - The id of teacher.
 * @param {Date} req.json.batch - The class batch.
 * @param {string} req.json.city - The city in which class held.
 * * @param {string} req.json.city - days of class.
 * 
 * @returns {Promise<NextResponse>} The response object with a success or error message.
 */
export async function POST(req) {
  try {
    // Extract title, teacherId, batch, city, and days from request body
    const { title, teacherId, batch, city, days } = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Create the class
    await createClass({ title, teacherId, batch, city, days });

    // Return success response
    return NextResponse.json({ success: true, message: "Class created" }, { status: 201 });
  } catch (error) {
    // Log and handle errors
    console.error("Exception occurred while creating class:", error);
    return NextResponse.json({ success: false, message: "An error occurred while creating class" }, { status: 500 });
  }
}

/**
 * Handles GET requests to fetch classes for a teacher by email.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - The response object.
 */
export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const email = searchParams.get('email');
  
      if (!email) {
        return NextResponse.json({ success: false, message: "Missing email query parameter" }, { status: 400 });
      }
  
      // Connect to MongoDB
      await connectMongoDB();
  
      // Fetch the classes
      const classes = await getClass({ email });
  
      // Return success response
      return NextResponse.json({ success: true, classes }, { status: 200 });
    } catch (error) {
      // Log and handle errors
      console.error("Exception occurred while fetching class:", error);
      return NextResponse.json({ success: false, message: "An error occurred while fetching classes" }, { status: 500 });
    }
  }
