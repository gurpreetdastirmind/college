import { Notification } from '../models/index.js';

export const getNotifications = async (req, res) => {
  const notifications = await Notification.findAll({
    order: [['publish_date', 'DESC'], ['id', 'DESC']],
  });
  res.json({ notifications });
};

export const createNotification = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.pdf_url = `/uploads/pdfs/${req.file.filename}`;
  const notification = await Notification.create(data);
  res.status(201).json({ notification });
};

export const updateNotification = async (req, res) => {
  const n = await Notification.findByPk(req.params.id);
  if (!n) return res.status(404).json({ message: 'Not found' });
  const data = { ...req.body };
  if (req.file) data.pdf_url = `/uploads/pdfs/${req.file.filename}`;
  await n.update(data);
  res.json({ notification: n });
};

export const deleteNotification = async (req, res) => {
  const n = await Notification.findByPk(req.params.id);
  if (!n) return res.status(404).json({ message: 'Not found' });
  await n.destroy();
  res.json({ message: 'Deleted' });
};