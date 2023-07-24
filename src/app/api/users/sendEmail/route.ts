import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, emailType, userId } = await request.json();
    await sendEmail({ email, emailType, userId });

    return NextResponse.json({ message: "Email Verified" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse;
}
