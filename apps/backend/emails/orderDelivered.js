import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://stylrr.vercel.app";

/**
 * Generates an order delivered email.
 * @param {Object} order - The order document.
 * @returns {string} Full HTML email string.
 */
export const orderDeliveredEmail = (order) => {
  const { orderNumber, shippingAddress } = order;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#127881;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Your Order Has Been Delivered!
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${shippingAddress.firstName}, your order has arrived! We hope you love everything.
    </p>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px 20px; text-align: center; margin-bottom: 28px; border: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
      <p style="font-size: 18px; font-weight: 700; color: #111827; margin: 0; letter-spacing: 1px;">${orderNumber}</p>
    </div>

    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

    <!-- Timeline -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td width="33%" style="text-align: center; padding: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #22c55e; color: #fff; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#10003;</div>
          <p style="font-size: 11px; color: #22c55e; font-weight: 600; margin: 0;">Confirmed</p>
        </td>
        <td width="33%" style="text-align: center; padding: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #22c55e; color: #fff; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#10003;</div>
          <p style="font-size: 11px; color: #22c55e; font-weight: 600; margin: 0;">Shipped</p>
        </td>
        <td width="33%" style="text-align: center; padding: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #22c55e; color: #fff; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#10003;</div>
          <p style="font-size: 11px; color: #22c55e; font-weight: 600; margin: 0;">Delivered</p>
        </td>
      </tr>
    </table>

    <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 28px 0 0 0; line-height: 1.6;">
      Thank you for shopping with Stylrr! We'd love to see you again.
    </p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${SITE_URL}/shop" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Continue Shopping
      </a>
    </div>

    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      If there's any issue with your order, please contact our support team within 30 days.
    </p>
  `;

  return emailLayout(bodyContent);
};
