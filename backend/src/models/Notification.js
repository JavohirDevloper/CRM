const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    date: {
      type: mongoose.SchemaTypes.Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
