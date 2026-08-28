import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route runs as a free Vercel serverless function.
// It sends the submitted form straight to your own Gmail inbox via
// Gmail's SMTP server — no third-party form service (Netlify, Formspree,
// etc.) and no paid plan required.
//
// Setup (one-time):
// 1. Turn on 2-Step Verification on the Google account you want to send to:
//    https://myaccount.google.com/security
// 2. Create an "App Password": https://myaccount.google.com/apppasswords
//    (choose "Mail" / "Other", copy the 16-character password it gives you)
// 3. Add these two environment variables:
//    - Locally: create a .env.local file (see .env.local.example) with
//      GMAIL_USER=youraddress@gmail.com
//      GMAIL_APP_PASSWORD=the16charapppassword
//    - On Vercel: Project Settings -> Environment Variables -> add the
//      same two keys, then redeploy.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      projectType,
      projectName,
      budget,
      timeline,
      details,
      website, // honeypot field, should always be empty
    } = body;

    // Honeypot: bots tend to fill every field, real users never see this one.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !projectName || !details) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
      return NextResponse.json(
        { error: "Email is not configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const subject = `New project inquiry: ${projectName} — ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      projectType ? `Project type: ${projectType}` : null,
      `Project name: ${projectName}`,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      "Brief:",
      details,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin-bottom: 4px;">New project inquiry</h2>
        <p style="color:#666; margin-top:0;">via portfolio contact form</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tbody>
            <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${escapeHtml(email)}</td></tr>
            ${company ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
            ${projectType ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Project type</td><td>${escapeHtml(projectType)}</td></tr>` : ""}
            <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Project name</td><td>${escapeHtml(projectName)}</td></tr>
            ${budget ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Budget</td><td>${escapeHtml(budget)}</td></tr>` : ""}
            ${timeline ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Timeline</td><td>${escapeHtml(timeline)}</td></tr>` : ""}
          </tbody>
        </table>
        <p style="font-weight:600; margin-bottom:4px;">Brief</p>
        <p style="white-space: pre-wrap;">${escapeHtml(details)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
