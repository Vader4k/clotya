import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://clotya.vercel.app";

/**
 * Generates an order shipped email.
 * @param {Object} order - The order document.
 * @returns {string} Full HTML email string.
 */
export const orderShippedEmail = (order) => {
  const { orderNumber, shippingAddress } = order;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #fefce8; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#128666;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Your Order Has Been Shipped!
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${shippingAddress.firstName}, your order is on its way! It's been handed off to our delivery partner and is heading to you.
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
          <p style="font-size: 11px; color: #22c55e; font-weight: 600; margin: 0;">Processed</p>
        </td>
        <td width="33%" style="text-align: center; padding: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #eab308; color: #fff; line-height: 32px; font-size: 14px; margin: 0 auto 8px auto;">&#128666;</div>
          <p style="font-size: 11px; color: #eab308; font-weight: 600; margin: 0;">Shipped</p>
        </td>
      </tr>
    </table>

    <!-- Delivery Info -->
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px 20px; margin-top: 28px; border: 1px solid #e5e7eb;">
      <p style="font-size: 13px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">Delivering To</p>
      <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.8;">
        ${shippingAddress.firstName} ${shippingAddress.lastName}<br/>
        ${shippingAddress.address}<br/>
        ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}<br/>
        ${shippingAddress.country}
      </p>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${SITE_URL}/order-tracking" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Track Your Order
      </a>
    </div>

    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      We'll notify you once your order has been delivered.
    </p>
  `;

  return emailLayout(bodyContent);
};
