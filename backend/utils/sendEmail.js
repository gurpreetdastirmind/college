import nodemailer from 'nodemailer';

/**
 * Create reusable transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
};

/**
 * Send an email
 * @param {Object} options - { to, subject, html, text, from, replyTo }
 * @returns {Promise<Object>} info
 */
export const sendEmail = async ({ to, subject, html, text, from, replyTo }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email not configured. Skipping send.');
      return { skipped: true };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from:
        from ||
        `"Punjab College" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || html?.replace(/<[^>]+>/g, ''),
      replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('❌ Email send error:', err.message);
    throw err;
  }
};

/**
 * Send admission confirmation email
 */
export const sendAdmissionConfirmation = async (admission) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Punjab College</h1>
        <p style="margin: 5px 0 0;">Application Received</p>
      </div>
      <div style="background: #f9fafb; padding: 25px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1e3a8a;">Dear ${admission.student_name},</h2>
        <p>Thank you for applying to Punjab College. We have received your application successfully.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Course:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${admission.course_id}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Category:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${admission.category}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${admission.phone}</td></tr>
          <tr><td style="padding: 8px;"><strong>Status:</strong></td><td style="padding: 8px;"><span style="background: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 4px;">${admission.status}</span></td></tr>
        </table>
        <p>Our admissions team will review your application and get back to you soon.</p>
        <p>For any queries, contact us at <a href="mailto:admissions@college.ac.in">admissions@college.ac.in</a></p>
      </div>
      <div style="background: #1e3a8a; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
        © 2026 Punjab College. All rights reserved.
      </div>
    </div>
  `;

  return sendEmail({
    to: admission.email,
    subject: 'Application Received — Punjab College',
    html,
  });
};

/**
 * Send contact form auto-reply
 */
export const sendContactAutoReply = async ({ name, email, subject }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Punjab College</h1>
      </div>
      <div style="background: #f9fafb; padding: 25px;">
        <h2 style="color: #1e3a8a;">Hi ${name},</h2>
        <p>Thank you for contacting us regarding "<strong>${subject}</strong>".</p>
        <p>We have received your message and will respond within 1-2 business days.</p>
        <p>For urgent inquiries, call us at <strong>+91 12345 67890</strong>.</p>
      </div>
      <div style="background: #1e3a8a; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
        © 2026 Punjab College
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'We received your message — Punjab College',
    html,
  });
};

/**
 * Send notification to admin about new admission
 */
export const sendAdminAlert = async (admission) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #dc2626;">🔔 New Admission Application</h2>
      <p><strong>Name:</strong> ${admission.student_name}</p>
      <p><strong>Email:</strong> ${admission.email}</p>
      <p><strong>Phone:</strong> ${admission.phone}</p>
      <p><strong>Course ID:</strong> ${admission.course_id}</p>
      <p><strong>Category:</strong> ${admission.category}</p>
      <p><strong>12th Marks:</strong> ${admission.marks_12th}</p>
      <p><a href="${process.env.CLIENT_URL}/admin/admissions">View in Admin Panel →</a></p>
    </div>
  `;

  return sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Admission: ${admission.student_name}`,
    html,
  });
};

export default sendEmail;