import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendemail";
import { welcomeTemplate } from "@/lib/email/templates/welcome";

export async function POST(req: Request) {
  try {
    const { to, name } = await req.json();

    const html = welcomeTemplate(name);

    const response = await sendEmail({
      to,
      subject: "Welcome to Our Platform 🚀",
      html,
    });

    console.log("Email sent:", response[0].headers);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Email send failed" },
      { status: 500 }
    );
  }
}
