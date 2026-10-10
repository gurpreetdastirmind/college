import { Message } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { sendContactAutoReply } from '../utils/sendEmail.js';

export const createMessage = asyncHandler(async (req, res) => {
  const msg = await Message.create(req.body);

  // Auto-reply (non-blocking)
  sendContactAutoReply({
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
  }).catch(console.error);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: msg,
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, messages });
});