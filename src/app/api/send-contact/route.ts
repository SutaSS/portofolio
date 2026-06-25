import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with API key or a placeholder for build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  // Check if API key is configured at runtime
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    );
  }
  
  try {
    const { name, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL || 'your-email@gmail.com'],
      subject: `New Contact from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1A2A44 0%, #0D1B2A 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #7FFFD4; margin: 0; font-size: 28px; font-weight: bold;">
              📬 New Contact Message
            </h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #7FFFD4;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #6c757d;">
                <strong style="color: #1A2A44; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</strong>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 18px; color: #1A2A44; font-weight: 600;">
                ${name}
              </p>
              <p style="margin: 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #7FFFD4; text-decoration: none; font-weight: 500;">
                  ${email}
                </a>
              </p>
            </div>
            
            <div style="margin-top: 24px;">
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                Message
              </p>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #708D81;">
                <p style="margin: 0; color: #212529; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                Sent from your portfolio contact form
              </p>
              <p style="margin: 8px 0 0 0; color: #adb5bd; font-size: 11px;">
                ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
