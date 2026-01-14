import { Resend } from 'resend';
import { Order } from '@/types';

// Initialize Resend client lazily
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set');
    return new Resend('missing_api_key');
  }
  return new Resend(apiKey);
};

// Generate order email HTML
export const generateOrderEmailHTML = (order: Order): string => {
  const itemsHTML = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.productName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${item.unitPrice.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order - Cantate Kitchen</title>
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e1e1e; background-color: #f9fafb; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🍲 New Order Received!</h1>
            <p style="color: #FEFAE0; margin: 8px 0 0 0; font-size: 14px;">Cantate Kitchen</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <!-- Order Date -->
            <div style="background-color: #FEFAE0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; color: #4A4A4A;">
                <strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString('en-NG', {
    dateStyle: 'full',
    timeStyle: 'short',
  })}
              </p>
            </div>

            <!-- Customer Information -->
            <div style="margin-bottom: 32px;">
              <h2 style="color: #2D5016; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #E85D04; padding-bottom: 8px;">Customer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #4A4A4A; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e1e1e;">${order.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #4A4A4A;">Email:</td>
                  <td style="padding: 8px 0; color: #1e1e1e;">
                    <a href="mailto:${order.email}" style="color: #E85D04; text-decoration: none;">${order.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #4A4A4A;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e1e1e;">
                    <a href="tel:${order.phone}" style="color: #E85D04; text-decoration: none;">${order.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #4A4A4A; width: 120px;">Method:</td>
                  <td style="padding: 8px 0; color: #1e1e1e; text-transform: capitalize;">${order.deliveryMethod}</td>
                </tr>
                ${order.deliveryMethod === 'delivery' ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #4A4A4A; vertical-align: top;">Address:</td>
                  <td style="padding: 8px 0; color: #1e1e1e;">${order.address}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Order Items -->
            <div style="margin-bottom: 32px;">
              <h2 style="color: #2D5016; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #E85D04; padding-bottom: 8px;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #FEFAE0;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #2D5016;">Item</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #2D5016;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #2D5016;">Price</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #2D5016;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
                ${order.totalAmount ? `
                <tfoot>
                  <tr style="background-color: #f9fafb;">
                    <td colspan="3" style="padding: 16px 12px; text-align: right; font-weight: 700; color: #2D5016; font-size: 16px;">Grand Total:</td>
                    <td style="padding: 16px 12px; text-align: right; font-weight: 700; color: #E85D04; font-size: 18px;">₦${order.totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
                ` : ''}
              </table>
            </div>

            <!-- Special Instructions -->
            ${order.specialInstructions
      ? `
              <div style="margin-bottom: 32px;">
                <h2 style="color: #2D5016; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #E85D04; padding-bottom: 8px;">Special Instructions</h2>
                <div style="background-color: #FFF9E6; padding: 16px; border-radius: 8px; border-left: 4px solid #F77F00;">
                  <p style="margin: 0; color: #4A4A4A; font-style: italic;">${order.specialInstructions}</p>
                </div>
              </div>
            `
      : ''
    }

            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #E85D04 0%, #F77F00 100%); padding: 20px; border-radius: 8px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;">
                📞 Please contact the customer to confirm this order!
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 14px; color: #767676;">
              This is an automated notification from your Cantate Kitchen website.
            </p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #767676;">
              © ${new Date().getFullYear()} Cantate Kitchen. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Generate customer confirmation email HTML
export const generateCustomerConfirmationHTML = (order: Order): string => {
  const itemsHTML = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.productName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${item.unitPrice.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Cantate Kitchen</title>
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e1e1e; background-color: #f9fafb; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2E 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">✅ Order Received!</h1>
            <p style="color: #FEFAE0; margin: 8px 0 0 0; font-size: 14px;">Thank you for choosing Cantate Kitchen</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; color: #1e1e1e; margin: 0 0 24px 0;">
              Dear <strong>${order.name}</strong>,
            </p>
            <p style="font-size: 16px; color: #4A4A4A; margin: 0 0 24px 0;">
              Thank you for your order! We've received your request and will contact you shortly to confirm the details and arrange delivery.
            </p>

            <!-- Order Summary -->
            <div style="margin-bottom: 32px;">
              <h2 style="color: #2D5016; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #E85D04; padding-bottom: 8px;">Your Order</h2>
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #FEFAE0;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #2D5016;">Item</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #2D5016;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #2D5016;">Price</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #2D5016;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
                ${order.totalAmount ? `
                <tfoot>
                  <tr style="background-color: #f9fafb;">
                    <td colspan="3" style="padding: 16px 12px; text-align: right; font-weight: 700; color: #2D5016; font-size: 16px;">Grand Total:</td>
                    <td style="padding: 16px 12px; text-align: right; font-weight: 700; color: #E85D04; font-size: 18px;">₦${order.totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
                ` : ''}
              </table>
            </div>

            <!-- Delivery Info -->
            <div style="background-color: #FEFAE0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #2D5016;">Delivery Method:</p>
              <p style="margin: 0 0 16px 0; color: #4A4A4A; text-transform: capitalize;">${order.deliveryMethod}</p>
              
              ${order.deliveryMethod === 'delivery' ? `
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #2D5016;">Delivery Address:</p>
              <p style="margin: 0 0 16px 0; color: #4A4A4A;">${order.address}</p>
              <p style="margin: 0; font-size: 14px; color: #E85D04; font-style: italic;">
                Note: Delivery cost will be communicated to you during confirmation.
              </p>
              ` : ''}
            </div>

            ${order.specialInstructions
      ? `
              <div style="background-color: #FFF9E6; padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #F77F00;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #E85D04;">Special Instructions:</p>
                <p style="margin: 0; color: #4A4A4A; font-style: italic;">${order.specialInstructions}</p>
              </div>
            `
      : ''
    }

            <div style="background: linear-gradient(135deg, #E85D04 0%, #F77F00 100%); padding: 20px; border-radius: 8px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;">
                We'll call you soon to confirm your order! 📞
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #4A4A4A; font-weight: 600;">
              Questions? Contact us anytime!
            </p>
            <p style="margin: 0; font-size: 12px; color: #767676;">
              © ${new Date().getFullYear()} Cantate Kitchen. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send order notification email to company
export async function sendOrderNotification(order: Order): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const companyEmail = process.env.COMPANY_EMAIL || 'cantatekitchen@gmail.com';

    const { data, error } = await resend.emails.send({
      from: 'Cantate Kitchen <onboarding@resend.dev>',
      to: companyEmail,
      subject: `New Order from ${order.name}`,
      html: generateOrderEmailHTML(order),
    });

    if (error) {
      console.error('Error sending order notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending order notification:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// Send confirmation email to customer
export async function sendCustomerConfirmation(order: Order): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: 'Cantate Kitchen <onboarding@resend.dev>',
      to: order.email,
      subject: 'Order Confirmation - Cantate Kitchen',
      html: generateCustomerConfirmationHTML(order),
    });

    if (error) {
      console.error('Error sending customer confirmation:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
