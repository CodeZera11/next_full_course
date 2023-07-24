import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log(email);

    console.log("finding user");
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      success: true,
      message: "Please check your email for reset password link",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
