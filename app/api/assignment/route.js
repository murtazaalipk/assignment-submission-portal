import { connectMongoDB } from "@/lib/mongodb";
import { createAssignment } from "../../../services/assignment";
import { NextResponse } from "next/server";

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

export async function GET(req){
    try{

        const{teacherEmail} = await req.json() ;

        // Connect to MongoDB
        await connectMongoDB();

        // Create the assignment
        await createAssignment({teacherEmail});
        
        // Return success response
        return NextResponse.json({ success: true, message: "Assignment posted" }, { status: 201 });
    }
    catch (error) {
        console.error("Exception occurred while fetching assignment:", error);
        return NextResponse.json({ success: false, message: "An error occurred while fetching assignment" }, { status: 500 });
    }
}
