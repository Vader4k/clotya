import nodemailer from "nodemailer";

let transporter;

export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Clotya" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true, response: info };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error };
  }
};
