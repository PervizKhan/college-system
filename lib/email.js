import nodemailer from "nodemailer";

export async function sendOTPEmail(email, otp) {
  // 1. Create a transporter (Settings for your email provider)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  // 2. Define the email content
  const mailOptions = {
    from: `"College Admin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Registration OTP - DIT Course",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Verify Your Email</h2>
        <p>Thank you for registering for the <b>Diploma in Information Technology (DIT)</b> course.</p>
        <p>Your 6-digit verification code is:</p>
        <h1 style="letter-spacing: 5px; color: #1e293b;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <hr />
        <p style="font-size: 10px; color: #94a3b8;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  // 3. Send it!
  await transporter.sendMail(mailOptions);
}