import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, organization, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Ki Khobor Contact Form <onboarding@resend.dev>",
      to: ["kikhoborai@gmail.com"],
      replyTo: email,
      subject: `New message from ${name} - Ki Khobor Contact Form`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e1e2e;">
          <h2 style="color: #818cf8; margin-top: 0;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; width: 140px; vertical-align: top;">Full Name</td>
              <td style="padding: 10px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Organization</td>
              <td style="padding: 10px 0;">${organization || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0;">${phone || "N/A"}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #1e1e2e; margin: 24px 0;" />

          <p style="color: #94a3b8; margin-bottom: 8px; font-size: 13px;">MESSAGE</p>
          <p style="background: #121218; padding: 16px; border-radius: 8px; border-left: 3px solid #818cf8; white-space: pre-wrap; line-height: 1.7;">${message}</p>

          <p style="font-size: 12px; color: #475569; margin-top: 32px;">Sent via Ki Khobor contact form. Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
