import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://stylrr.vercel.app";

/**
 * Generates an account suspended email.
 * @param {string} name - The user's name.
 * @returns {string} Full HTML email string.
 */
export const accountSuspendedEmail = (name) => {
  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #fef2f2; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#128683;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Account Suspended
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${name}, your stylr account has been suspended. You will not be able to log in or place orders until your account is reactivated.
    </p>

    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

    <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; border: 1px solid #fecaca;">
      <p style="font-size: 14px; font-weight: 600; color: #991b1b; margin: 0 0 8px 0;">Why was my account suspended?</p>
      <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.7;">
        Accounts may be suspended for a variety of reasons including policy violations, suspicious activity, or at the request of an administrator. 
        If you believe this was done in error, please contact our support team for assistance.
      </p>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${SITE_URL}/contact" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Contact Support
      </a>
    </div>

    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      If you did not expect this action, please reach out to us immediately.
    </p>
  `;

  return emailLayout(bodyContent);
};

/**
 * Generates an account reactivated email.
 * @param {string} name - The user's name.
 * @returns {string} Full HTML email string.
 */
export const accountReactivatedEmail = (name) => {
  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#127881;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Your Account Has Been Reactivated
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${name}, great news! Your stylrr account has been reactivated. You can now log in and continue shopping as usual.
    </p>

    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

    <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; border: 1px solid #bbf7d0;">
      <p style="font-size: 14px; font-weight: 600; color: #166534; margin: 0 0 8px 0;">You're all set!</p>
      <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.7;">
        Your account is fully active again. All your previous order history, saved addresses, and preferences remain intact. 
        Welcome back!
      </p>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${SITE_URL}/shop" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Start Shopping
      </a>
    </div>

    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      Thank you for your patience. We're glad to have you back!
    </p>
  `;

  return emailLayout(bodyContent);
};
