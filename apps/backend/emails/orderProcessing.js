import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://stylrr.vercel.app";

/**
 * Generates an order processing email.
 * @param {Object} order - The order document.
 * @returns {string} Full HTML email string.
 */
export const orderProcessingEmail = (order) => {
  const { orderNumber, shippingAddress } = order;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #eff6ff; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#9881;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Your Order Is Being Prepared
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${shippingAddress.firstName}, great news! We've started processing your order and our team is carefully preparing your items.
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
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #3b82f6; color: #fff; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#9881;</div>
          <p style="font-size: 11px; color: #3b82f6; font-weight: 600; margin: 0;">Processing</p>
        </td>
        <td width="33%" style="text-align: center; padding: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #e5e7eb; color: #9ca3af; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#128666;</div>
          <p style="font-size: 11px; color: #9ca3af; font-weight: 600; margin: 0;">Shipped</p>
        </td>
      </tr>
    </table>

    <p style="font-size: 13px; color: #6b7280; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      We'll send you another email with tracking details once your order has been shipped.
    </p>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${SITE_URL}/order-tracking" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Track Your Order
      </a>
    </div>
  `;

  return emailLayout(bodyContent);
};
