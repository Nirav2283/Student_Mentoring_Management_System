import nodemailer from "nodemailer";
import { mentoraEmailTemplate, mentoraButton } from "./emailTemplate";

export async function sendAdminWelcomeEmail(
  email: string,
  name: string,
  collegeName: string,
  token: string
) {
  const verificationUrl = `https://student-mentoring-management-system-liart.vercel.app/api/auth/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = mentoraEmailTemplate({
    preheader: `Welcome to Mentora, ${name}! Verify your email to get started.`,
    body: `
      <!-- Accent Bar -->
      <div style="height:4px; background:linear-gradient(90deg, #f5c518 0%, #f59e0b 100%);"></div>

      <div style="padding:40px 36px;">
        <!-- Success Icon -->
        <div style="text-align:center; margin-bottom:28px;">
          <div style="display:inline-block; width:64px; height:64px; border-radius:50%; background-color:#f0fdf4; border:2px solid #bbf7d0; line-height:64px; text-align:center;">
            <span style="font-size:32px; color:#22c55e;">✓</span>
          </div>
        </div>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:800; color:#1a1a1a; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          Account Created Successfully!
        </h1>
        <p style="margin:0 0 28px; font-size:15px; color:#6b7280; text-align:center; line-height:1.6; font-family:'Segoe UI',Arial,sans-serif;">
          Hello <strong style="color:#1a1a1a;">${name}</strong>, your administrator account for
          <strong style="color:#1a1a1a;">${collegeName}</strong> is now active.
        </p>

        <!-- Divider -->
        <div style="border-top:1px solid #f0ede6; margin:0 0 28px;"></div>

        <p style="margin:0 0 8px; font-size:14px; color:#6b7280; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          Please verify your email address to start managing your mentorship program.
        </p>
        <p style="margin:0 0 28px; font-size:12px; color:#9ca3af; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          This link will expire in 1 hour.
        </p>

        ${mentoraButton(verificationUrl, "Verify Email Address →")}

        <!-- Fallback Link -->
        <p style="margin:28px 0 0; font-size:11px; color:#b5b3ab; text-align:center; word-break:break-all; font-family:'Segoe UI',Arial,sans-serif;">
          If the button doesn't work, copy this link:<br>
          <a href="${verificationUrl}" style="color:#d97706;">${verificationUrl}</a>
        </p>
      </div>
    `,
  });

  const mailOptions = {
    from: `"Mentora" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Mentora Account",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending admin welcome email:", error);
  }
}