import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    // find the user from cookie token
    const userId = await getDataFromToken(request);

    // find the user from database
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
