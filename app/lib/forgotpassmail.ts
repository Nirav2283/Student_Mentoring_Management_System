import nodemailer from "nodemailer";
import { mentoraEmailTemplate, mentoraButton } from "./emailTemplate";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email: string, link: string) => {
  const htmlContent = mentoraEmailTemplate({
    preheader: "You requested a password reset for your Mentora account.",
    body: `
      <!-- Accent Bar -->
      <div style="height:4px; background:linear-gradient(90deg, #f5c518 0%, #f59e0b 100%);"></div>

      <div style="padding:40px 36px;">
        <!-- Lock Icon -->
        <div style="text-align:center; margin-bottom:28px;">
          <div style="display:inline-block; width:64px; height:64px; border-radius:50%; background-color:#fefce8; border:2px solid #fde68a; line-height:64px; text-align:center;">
            <span style="font-size:28px;">🔒</span>
          </div>
        </div>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:800; color:#1a1a1a; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          Password Reset Request
        </h1>
        <p style="margin:0 0 28px; font-size:15px; color:#6b7280; text-align:center; line-height:1.6; font-family:'Segoe UI',Arial,sans-serif;">
          We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
        </p>

        ${mentoraButton(link, "Reset My Password →")}

        <p style="margin:24px 0 0; font-size:13px; color:#9ca3af; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          This link will expire in <strong style="color:#6b7280;">15 minutes</strong>.
        </p>

        <!-- Divider -->
        <div style="border-top:1px solid #f0ede6; margin:28px 0;"></div>

        <!-- Fallback Link -->
        <p style="margin:0; font-size:11px; color:#b5b3ab; text-align:center; word-break:break-all; font-family:'Segoe UI',Arial,sans-serif;">
          If the button doesn't work, copy this link:<br>
          <a href="${link}" style="color:#d97706;">${link}</a>
        </p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"Mentora" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Mentora Password",
    html: htmlContent,
  });
};