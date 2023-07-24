import { connectToDB } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json({ error: "Please provide credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "No user found!" });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json({ error: "Incorrect Password!" });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successfull",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}
