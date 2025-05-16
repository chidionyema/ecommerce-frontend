// File: app/api/submit-contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define the expected structure of the form data coming from the client
interface ContactFormData {
  name: string;
  email: string;
  phone?: string; // Optional
  message: string;
}
/*
// Initialize Resend with your API key from environment variables
// Ensure RESEND_API_KEY is set in your .env.local and Vercel environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

// Get receiver and sender email addresses from environment variables
const contactReceiverEmail = process.env.CONTACT_FORM_RECEIVER_EMAIL;
const emailSenderAddress = process.env.EMAIL_SENDER_ADDRESS;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body as ContactFormData;

    // --- Server-Side Validation (CRUCIAL!) ---
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email, and message are required fields.' }, { status: 400 });
    }
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ message: 'Name must be between 2 and 100 characters.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email format provided.' }, { status: 400 });
    }
    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json({ message: 'Message must be between 10 and 5000 characters.' }, { status: 400 });
    }
    if (phone && (phone.trim().length > 20 || !/^[0-9+\-\s()]*$/.test(phone))) {
      return NextResponse.json({ message: 'Invalid phone number format or length.' }, { status: 400 });
    }
    // --- End of Server-Side Validation ---

    // Check if critical environment variables are set
    if (!resendApiKey) {
      console.error("Critical: RESEND_API_KEY is not configured on the server.");
      return NextResponse.json({ message: 'Email service is not configured.', error: 'Server configuration error' }, { status: 500 });
    }
    if (!contactReceiverEmail || !emailSenderAddress) {
      console.error("Critical: Email sender/receiver addresses not configured.");
      return NextResponse.json({ message: 'Email addresses are not set up correctly on the server.', error: 'Server configuration error' }, { status: 500 });
    }

    const { data, error: resendError } = await resend.emails.send({
      from: `Your Website Name <${emailSenderAddress}>`, // e.g., "My Awesome Site <noreply@myawesomesite.com>"
      to: [contactReceiverEmail as string], // Ensure this is defined and a string
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email, // Corrected from reply_to to replyTo
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">New Contact Submission</h2>
          <p>You've received a new message through your website's contact form:</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || '<em>Not provided</em>'}</p>
          <h3 style="color: #0056b3; margin-top: 25px; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f9f9f9; border-left: 4px solid #0056b3; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #777;">This email was sent from your website's contact form.</p>
        </div>
      `,
      text: `New Contact Submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}\n\n---\nSent from your website contact form.`,
    });

    if (resendError) {
      console.error('Resend API Error:', resendError);
      return NextResponse.json({ message: 'Failed to send your message. Please try again later.', error: "Email provider error" }, { status: 500 });
    }

    console.log('Email sent successfully via Resend:', data);
    return NextResponse.json({ message: 'Thank you! Your message has been sent successfully.' }, { status: 200 });

  } catch (exception: any) { // Catching general errors like JSON parsing errors or unexpected issues
    console.error('Error in POST /api/submit-contact:', exception);
    // Check if it's a SyntaxError from JSON parsing
    if (exception instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid request format.', error: exception.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.', error: exception.message || 'Unknown server error' }, { status: 500 });
  }
}

// Optional: If you want to explicitly disallow GET requests to this endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Method GET not allowed for this endpoint.' }, { status: 405, headers: { 'Allow': 'POST' } });
}*/