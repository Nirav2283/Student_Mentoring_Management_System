import nodemailer from "nodemailer";
import {
  mentoraEmailTemplate,
  mentoraInfoBox,
  mentoraField,
} from "./emailTemplate";

export async function sendStudentEmail(
  studentname: string,
  password: string,
  email: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = mentoraEmailTemplate({
    preheader: `Welcome to Mentora, ${studentname}! Your student account is ready.`,
    body: `
      <!-- Accent Bar -->
      <div style="height:4px; background:linear-gradient(90deg, #f5c518 0%, #f59e0b 100%);"></div>

      <div style="padding:40px 36px;">
        <h1 style="margin:0 0 8px; font-size:24px; font-weight:800; color:#1a1a1a; font-family:'Segoe UI',Arial,sans-serif;">
          Welcome, ${studentname}!
        </h1>
        <p style="margin:0 0 24px; font-size:15px; color:#6b7280; line-height:1.6; font-family:'Segoe UI',Arial,sans-serif;">
          Your student account has been successfully created. You're all set to start your mentorship journey.
        </p>

        ${mentoraInfoBox(`
          ${mentoraField("Login Email", email)}
          ${mentoraField("Temporary Password", password)}
          <div style="margin:0;">
            <div style="font-size:11px; color:#92845a; font-weight:600; font-family:'Segoe UI',Arial,sans-serif;">
              Please change your password after first login.
            </div>
          </div>
        `)}

        <p style="margin:0; font-size:13px; color:#9ca3af; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
          Use these credentials to log in at your institution's Mentora portal.
        </p>
      </div>
    `,
  });

  const mailOptions = {
    from: `"Mentora" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Mentora Student Account is Ready",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending student welcome email:", error);
    throw error;
  }
}