import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.goal || !body.fullName || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add timeout and connection settings for production
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    const subject = `New Submission: ${body.goal === 'tokenize' ? 'Tokenize my own assets' : 'Invest in tokenized assets'}`;
    
    let emailBody = `<h1>New Intent to Tokenize Submission</h1>`;
    emailBody += `<p><strong>Goal:</strong> ${body.goal === 'tokenize' ? 'Tokenize my own assets' : 'Invest in tokenized assets'}</p>`;
    emailBody += `<p><strong>Full Name:</strong> ${body.fullName}</p>`;
    emailBody += `<p><strong>Email:</strong> ${body.email}</p>`;

    if (body.company) {
      emailBody += `<p><strong>Company:</strong> ${body.company}</p>`;
    }

    if (body.phone) {
      emailBody += `<p><strong>Phone:</strong> ${body.phone}</p>`;
    }

    if (body.goal === 'tokenize') {
      emailBody += `<p><strong>Asset Type:</strong> ${body.assetType}</p>`;
      if (body.otherAssetType) {
        emailBody += `<p><strong>Other Asset Type:</strong> ${body.otherAssetType}</p>`;
      }
      emailBody += `<p><strong>Estimated Asset Value (USD):</strong> ${body.assetValue}</p>`;
    } else {
      emailBody += `<p><strong>Intended Investment (USD):</strong> ${body.investment}</p>`;
    }

    emailBody += `<hr><p><small>Submitted at: ${new Date().toISOString()}</small></p>`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Vaulto Notifier" <noreply@vaulto.ai>',
      to: ['charliebc@vaulto.ai', 'david@vaulto.ai'],
      subject: subject,
      html: emailBody,
    };

    // Verify transporter configuration before sending
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Return different error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ error: 'Email service temporarily unavailable' }, { status: 503 });
      }
      if (error.message.includes('Invalid login')) {
        return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: 'An error occurred while sending the email.' }, { status: 500 });
  }
} 