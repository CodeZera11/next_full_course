import { connectToDB } from "@/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { username, email, password } = data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please provide Credentials!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const mailinfo = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
      mailinfo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}
