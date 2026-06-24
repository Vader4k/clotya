import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://stylrr.vercel.app";

/**
 * Generates an order cancelled email.
 * @param {Object} order - The order document.
 * @returns {string} Full HTML email string.
 */
export const orderCancelledEmail = (order) => {
  const { orderNumber, shippingAddress, totalPrice } = order;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #fef2f2; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#10060;
      </div>
    </div>

    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Order Cancelled
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
      Hi ${shippingAddress.firstName}, we're sorry to let you know that your order has been cancelled.
    </p>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px 20px; text-align: center; margin-bottom: 28px; border: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
      <p style="font-size: 18px; font-weight: 700; color: #111827; margin: 0; letter-spacing: 1px;">${orderNumber}</p>
    </div>

    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

    <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; border: 1px solid #fecaca;">
      <p style="font-size: 14px; font-weight: 600; color: #991b1b; margin: 0 0 8px 0;">What happens next?</p>
      <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.7;">
        If you've already been charged, a full refund of <strong style="color: #111827;">$${Number(totalPrice).toFixed(2)}</strong> 
        will be processed automatically. Refunds typically take 5–10 business days to appear in your account.
      </p>
    </div>

    <p style="font-size: 13px; color: #6b7280; text-align: center; margin: 28px 0 0 0; line-height: 1.6;">
      We apologize for any inconvenience. If you have questions or believe this was a mistake, please reach out to our support team.
    </p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${SITE_URL}/contact" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px;">
        Contact Support
      </a>
    </div>
  `;

  return emailLayout(bodyContent);
};
