import { connectMongoDB } from "@/lib/mongodb";
import { createAssignment } from "@/services/assignment";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, description, dueDate,email } = req.body;
        
        // Connect to MongoDB
        await connectMongoDB();
        
        // Create the assignment
        await createAssignment(title, description, new Date(dueDate),email);
        
        // Return success response
        return NextResponse.json({ success: true, message: "Assignment posted" }, { status: 201 });
    } catch (error) {
        console.error("Exception occurred while posting assignment:", error);
        return NextResponse.json({ success: false, message: "An error occurred while posting assignment" }, { status: 500 });
    }
}
