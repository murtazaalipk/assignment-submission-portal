import { connectMongoDB } from "@/lib/mongodb";
import { createAssignment } from "../../../services/assignment";
import { NextResponse } from "next/server";
import { getAssignments } from "../../../services/assignment";

export async function POST(req) {
    try {
        const { title, description, dueDate,teacherEmail } = await req.json();
        
        // Connect to MongoDB
        await connectMongoDB();
        
        // Create the assignment
        await createAssignment({title, description, dueDate,teacherEmail});
        
        // Return success response
        return NextResponse.json({ success: true, message: "Assignment posted" }, { status: 201 });
    } catch (error) {
        console.error("Exception occurred while posting assignment:", error);
        return NextResponse.json({ success: false, message: "An error occurred while posting assignment" }, { status: 500 });
    }
}

// GET request to fetch assignments
export async function GET(req) {
    try {
      // Parse the query parameters (assuming teacherEmail is passed as a query parameter)
      const { searchParams } = new URL(req.url);
      const teacherEmail = searchParams.get('teacherEmail');
  
      if (!teacherEmail) {
        return NextResponse.json({ success: false, message: "Missing teacherEmail query parameter" }, { status: 400 });
      }
  
      // Connect to MongoDB
      await connectMongoDB();
  
      // Fetch the assignments
      const assignments = await getAssignments({ teacherEmail });
  
      // Return success response
      return NextResponse.json({ success: true, assignments }, { status: 200 });
    } catch (error) {
      console.error("Exception occurred while fetching assignments:", error);
      return NextResponse.json({ success: false, message: "An error occurred while fetching assignments" }, { status: 500 });
    }
  }
