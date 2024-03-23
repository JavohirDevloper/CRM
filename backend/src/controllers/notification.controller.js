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
    const { page = 1, limit = 10, sort, filter } = req.query;

    const query = Notification.find();

    // Sort
    if (sort) {
      const sortFields = sort.split(",");
      query.sort(sortFields.join(" "));
    }

    // Filter
    if (filter) {
      const filterFields = filter.split(",");
      filterFields.forEach((field) => {
        const [key, value] = field.split(":");
        query.where(key).equals(value);
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await Notification.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    query.skip(startIndex).limit(limit);

    const noti = await query;

    const response = {
      data: noti,
      page,
      limit,
      totalPages,
      totalCount,
    };

    res.json(response);
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
