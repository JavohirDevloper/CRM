const Notification = require("../models/Notification");
const Joi = require("joi");

const validateNotification = (notification) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });
  return schema.validate(notification);
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const { error } = validateNotification(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { text } = req.body;
    const notification = new Notification({ text });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateNotification(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const notification = await Notification.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res
      .status(200)
      .json({ message: "Notification deleted successfully", deletedNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
