import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email: string, link: string) => {
  await transporter.sendMail({
    from: `"Mentorship System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
    <div style="font-family: sans-serif; background-color: #f9f9f9; padding: 40px 0; width: 100%;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e1e1e1;">
        
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">SMMS Support</h1>
        </div>

        <div style="padding: 30px; color: #333333; line-height: 1.6;">
          <h2 style="margin-top: 0; color: #111827;">Password Reset Request</h2>
          <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset My Password
            </a>
          </div>

          <p style="font-size: 14px; color: #6b7280;">
            The button above will expire in <strong>15 minutes</strong>.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;" />
          
          <p style="font-size: 12px; color: #9ca3af;">
            If you're having trouble clicking the button, copy and paste the URL below into your web browser:
            <br />
            <span style="word-break: break-all; color: #2563eb;">${link}</span>
          </p>
        </div>

        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} SMMS. All rights reserved.
        </div>
      </div>
    </div>
    `,
  });
};