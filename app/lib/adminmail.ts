import nodemailer from "nodemailer";

export async function sendAdminWelcomeEmail(email: string, name: string , collegeName:string , token : string) {

    const verificationurl = `http://localhost:3000/api/auth/verify-email?token=${token}`
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Modern HTML Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px; text-align: center; background-color: #ffffff; }
        .logo { background-color: #2656f2; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 10px; margin: 0 auto 20px; font-weight: bold; font-size: 24px; }
        .success-icon { color: #2fb85b; font-size: 48px; margin-bottom: 20px; }
        h1 { color: #0f172a; font-size: 24px; margin-bottom: 10px; }
        p { color: #64748b; font-size: 16px; margin-bottom: 30px; }
        .button { background-color: #2656f2; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; }
        .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="logo">M</div>
          <div class="success-icon">✓</div>
          <h1>Account Created Successfully!</h1>
          <p>Hello <b>${name}</b>, your administrator account for the Mentorship Management System for ${collegeName} is now active. You can now manage programs, mentors, and students from your dashboard.</p>
          <p>Please Verify Your email</p>
          <a href="${verificationurl}" class="button">Verify Your email</a> 
          <p>This link will expire in 1 hour</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Mentorship Management System. All rights reserved.<br>
          If you did not authorize this account, please contact support immediately.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Mentorship System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to the Mentora System - Account Active",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending admin welcome email:", error);
  }
}