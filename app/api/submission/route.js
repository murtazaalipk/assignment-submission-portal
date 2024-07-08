import { connectMongoDB } from "@/lib/mongodb";
import { submitAssignment } from "@/services/submission";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { assignment_id, student_id, url } = await req.json();

        // Connect to MongoDB
        await connectMongoDB();

        //calling method to submit assignment
        const submittedAssignment = await submitAssignment({ assignment_id, student_id, url });

        return NextResponse.json({ success: true, message: "Submitted successfully", submittedAssignment }, { status: 200 });

    }
    catch (error) {
        console.error("Exception occurred while submitting assignment:", error);
        return NextResponse.json({ success: false, message: "An error occurred while submitting assignments" }, { status: 500 });
    }
}