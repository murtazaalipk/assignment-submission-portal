import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, cnic, password, role } = await req.json();
    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const isUserExist = await User.findOne({ cnic });
    if (isUserExist) {
      return NextResponse.json({
        message: "User already registered on this cnic.",
      });
    }
    const user = await User.create({
      name,
      email,
      cnic,
      password: hashedPassword,
      role,
    });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
