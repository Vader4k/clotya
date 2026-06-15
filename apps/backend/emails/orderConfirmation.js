import { emailLayout } from "./layout.js";

const SITE_URL = process.env.FRONTEND_URL || "https://clotya.vercel.app";

/**
 * Generates the order confirmation email HTML.
 * @param {Object} order - The order document from the database.
 * @returns {string} Full HTML email string.
 */
export const orderConfirmationEmail = (order) => {
  const { orderNumber, items, shippingAddress, totalPrice, shippingPrice, itemsPrice, shipmentType } = order;

  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="64" style="vertical-align: top;">
              <img 
                src="${item.image}" 
                alt="${item.name}" 
                width="56" 
                height="56" 
                style="border-radius: 6px; object-fit: cover; display: block;"
              />
            </td>
            <td style="vertical-align: top; padding-left: 12px;">
              <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #111827;">${item.name}</p>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                Qty: ${item.quantity}${item.size ? ` &middot; Size: ${item.size.toUpperCase()}` : ""}${item.color ? ` &middot; Color: ${item.color}` : ""}
              </p>
            </td>
            <td style="vertical-align: top; text-align: right; white-space: nowrap;">
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">$${(item.price * item.quantity).toFixed(2)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");

  const bodyContent = `
    <!-- Confirmation Icon -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; line-height: 64px; font-size: 32px;">
        &#128230;
      </div>
    </div>

    <!-- Heading -->
    <h1 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px 0;">
      Order Received!
    </h1>
    <p style="font-size: 15px; color: #6b7280; text-align: center; margin: 0 0 8px 0; line-height: 1.6;">
      Thank you for your order, ${shippingAddress.firstName}. We've received it and it's now being processed.
    </p>
    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 0 0 32px 0;">
      You'll receive an email once your order is being prepared and when it ships out for delivery.
    </p>

    <!-- Order Number Box -->
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px 20px; text-align: center; margin-bottom: 28px; border: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
      <p style="font-size: 18px; font-weight: 700; color: #111827; margin: 0; letter-spacing: 1px;">${orderNumber}</p>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

    <!-- Order Items -->
    <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Order Summary</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${itemRows}
    </table>

    <!-- Price Breakdown -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Subtotal</td>
        <td style="padding: 6px 0; font-size: 13px; color: #6b7280; text-align: right;">$${Number(itemsPrice).toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Shipping (${shipmentType === "local_pickup" ? "Local Pickup" : "Standard"})</td>
        <td style="padding: 6px 0; font-size: 13px; color: #6b7280; text-align: right;">${Number(shippingPrice) === 0 ? "Free" : "$" + Number(shippingPrice).toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2" style="border-top: 1px solid #e5e7eb; padding-top: 12px;"></td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-size: 15px; font-weight: 700; color: #111827;">Total</td>
        <td style="padding: 4px 0; font-size: 15px; font-weight: 700; color: #111827; text-align: right;">$${Number(totalPrice).toFixed(2)}</td>
      </tr>
    </table>

    <!-- Shipping Info -->
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px 20px; margin-top: 28px; border: 1px solid #e5e7eb;">
      <p style="font-size: 13px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">Shipping To</p>
      <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.8;">
        ${shippingAddress.firstName} ${shippingAddress.lastName}<br/>
        ${shippingAddress.address}<br/>
        ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}<br/>
        ${shippingAddress.country}
      </p>
    </div>

    <!-- Track Order CTA -->
    <div style="text-align: center; margin-top: 32px;">
      <a 
        href="${SITE_URL}/order-tracking" 
        style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 6px; letter-spacing: 0.3px;"
      >
        Track Your Order
      </a>
    </div>

    <!-- Note -->
    <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 24px 0 0 0; line-height: 1.6;">
      If you have any questions about your order, please don't hesitate to contact our support team.
    </p>
  `;

  return emailLayout(bodyContent);
};
