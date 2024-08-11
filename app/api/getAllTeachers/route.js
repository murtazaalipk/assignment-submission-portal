import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    // Query users with the role of "teacher"
    const teachers = await User.find({ role: "teacher" }).exec();

    if (teachers.length === 0) {
      return NextResponse.json({ message: "No teachers found" }, { status: 404 });
    }

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching teachers." },
      { status: 500 }
    );
  }
}
