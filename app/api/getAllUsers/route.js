import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    
    const users = await User.find(); // Fetch all users
    
    if (!users.length) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the users." },
      { status: 500 }
    );
  }
}
