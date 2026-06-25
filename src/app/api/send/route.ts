import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not defined in environment variables. Simulating successful transmission.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: ["andikahernadi@gmail.com"],
        subject: `Portfolio Inquiry: ${subject}`,
        html: `
          <h3>New Portfolio Message from ${name} (${email})</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to send email via Resend API." },
        { status: resendResponse.status },
      );
    }

    const data = await resendResponse.json();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Resend API route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
