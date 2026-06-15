const SITE_URL = process.env.FRONTEND_URL || "https://clotya.vercel.app";
const LOGO_URL = `${SITE_URL}/logo.png`;
const SUPPORT_EMAIL = "info@gmail.com";
const SUPPORT_PHONE = "(+800) 1234 5678 90";

export const emailHeader = () => `
  <div style="background-color: #000000; padding: 24px 32px; text-align: center;">
    <a href="${SITE_URL}" style="text-decoration: none;">
      <img 
        src="${LOGO_URL}" 
        alt="Clotya" 
        width="120" 
        height="auto" 
        style="display: inline-block; filter: invert(1);"
      />
    </a>
  </div>
`;

export const emailFooter = () => `
  <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="margin-bottom: 20px;">
      <a href="${SITE_URL}/shop" style="color: #6b7280; font-size: 13px; text-decoration: none; margin: 0 12px;">Shop</a>
      <a href="${SITE_URL}/blog" style="color: #6b7280; font-size: 13px; text-decoration: none; margin: 0 12px;">Blog</a>
      <a href="${SITE_URL}/contact" style="color: #6b7280; font-size: 13px; text-decoration: none; margin: 0 12px;">Contact</a>
    </div>
    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0; line-height: 1.6;">
      Need help? Reach us at 
      <a href="mailto:${SUPPORT_EMAIL}" style="color: #000000; text-decoration: none; font-weight: 500;">${SUPPORT_EMAIL}</a> 
      or call <span style="font-weight: 500;">${SUPPORT_PHONE}</span>
    </p>
    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
      We're available 8:00am — 7:00pm
    </p>
    <div style="border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
      <p style="color: #d1d5db; font-size: 11px; margin: 0;">
        &copy; ${new Date().getFullYear()} Clotya. All rights reserved.
      </p>
    </div>
  </div>
`;

/**
 * Wraps email body content with the standard Clotya header, footer, and base styles.
 * @param {string} bodyContent - The inner HTML content of the email.
 * @returns {string} Full HTML email string.
 */
export const emailLayout = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Clotya</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td>${emailHeader()}</td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px 32px;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td>${emailFooter()}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
