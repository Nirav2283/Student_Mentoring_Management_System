import nodemailer from "nodemailer";

export async function sendMentorEmail(
  mentorname: string,
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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 60px; }
        .main { background-color: #ffffff; margin: 40px auto; width: 100%; max-width: 500px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 30px; color: #334155; }
        .creds-box { background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin: 25px 0; border: 1px dashed #cbd5e1; }
        .creds-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; font-weight: 700; }
        .creds-value { font-family: 'Monaco', 'Consolas', monospace; font-size: 16px; color: #0f172a; margin-bottom: 16px; font-weight: 600; }
        .button { display: inline-block; background-color: #2563eb; color: #ffffff !important; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background-color 0.3s; }
        .footer { text-align: center; font-size: 13px; color: #94a3b8; padding: 0 20px; }
        h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
        p { line-height: 1.6; margin: 0 0 16px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main">
          <div class="header">
            <h1>Welcome to Mentora</h1>
          </div>
          <div class="content">
            <p style="font-size: 18px; font-weight: 600; color: #0f172a;">Hi ${mentorname},</p>
            <p>Your mentor account has been successfully created. You can start Following up Students and take Mentoring sessions</p>
            
            <div class="creds-box">
              <div class="creds-label">Username</div>
              <div class="creds-value">${email}</div>
              <div class="creds-label">Temporary Password</div>
              <div class="creds-value" style="margin-bottom: 0;">${password}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Mentorship Management System<br>
          If you didn't expect this email, please ignore it or contact support.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Mentora System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🚀 Your Mentora Account is Ready",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending mentor welcome email:", error);
    throw error;
  }
}