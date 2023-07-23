import { connectToDB } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const { token }: any = request.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    user.isVerfied = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    user.save();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
