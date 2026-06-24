import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://stylrr.vercel.app";

/**
 * Generates the welcome email HTML for a newly registered user.
 * @param {string} name - The user's name.
 * @returns {string} Full HTML email string.
 */
export const welcomeEmail = (name) => {
  const bodyContent = `
    <!-- Welcome Icon -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#10003;
      </div>
    </div>

    <!-- Heading -->
    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Welcome to Stylr, ${name}!
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Your account has been created successfully. We're thrilled to have you join our community of fashion enthusiasts.
    </p>

    <!-- Divider -->
    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 32px 0;"></div>

    <!-- Feature Grid -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td width="50%" style="padding: 0 8px 16px 0; vertical-align: top;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
            <p style="font-size: 20px; margin: 0 0 8px 0;">&#128666;</p>
            <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Free Shipping</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.5;">On orders over $130</p>
          </div>
        </td>
        <td width="50%" style="padding: 0 0 16px 8px; vertical-align: top;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
            <p style="font-size: 20px; margin: 0 0 8px 0;">&#128257;</p>
            <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Easy Returns</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.5;">30 day money-back guarantee</p>
          </div>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding: 0 8px 0 0; vertical-align: top;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
            <p style="font-size: 20px; margin: 0 0 8px 0;">&#128222;</p>
            <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">24/7 Support</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.5;">Always here to help</p>
          </div>
        </td>
        <td width="50%" style="padding: 0 0 0 8px; vertical-align: top;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
            <p style="font-size: 20px; margin: 0 0 8px 0;">&#128179;</p>
            <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Secure Payment</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.5;">Multiple payment options</p>
          </div>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <div style="text-align: center; margin-top: 32px;">
      <a 
        href="${SITE_URL}/shop" 
        style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px; letter-spacing: 0.3px;"
      >
        Start Shopping
      </a>
    </div>

    <!-- Subtle Note -->
    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      If you didn't create this account, please ignore this email or contact our support team.
    </p>
  `;

  return emailLayout(bodyContent);
};
