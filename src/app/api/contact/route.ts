import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize with a placeholder or env variable
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, projectDetails } = body;

    if (!firstName || !lastName || !email || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
        // If no API key is provided, simulate a successful response for frontend testing
        console.log("Mocking email send (no API key provided):", body);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
        return NextResponse.json({ success: true, mocked: true });
    }

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Update this to a verified domain later
      to: ['afrazapparel13@gmail.com'], // Update to the real recipient
      subject: `New Inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Inquiry from Afraz Apparel Website</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetails}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
