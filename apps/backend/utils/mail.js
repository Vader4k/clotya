import { Resend } from "resend";

let resend;

export const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    return { success: true, response };
  } catch (error) {
    console.log("Email Error", error);
    return { success: false, error };
  }
};
