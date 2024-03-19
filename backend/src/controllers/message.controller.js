const Chat = require("../models/Chats");
const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate({
        path: "sender",
        model: "User",
        select: "name profilePic phone_number",
      })
      .populate({
        path: "chatId",
        model: "Chat",
      });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, message, blogo_id, ...rest } = req.body;
    const msg = await Message.create({
      sender: req.user.userId, 
      message,
      chatId,
      ...rest,
    });

    const populatedMessage = await msg
      .populate("sender", "fullname profilePic phone_number")
      .populate({
        path: "chatId",
        select: "chatName isGroup users",
        model: "Chat",
        populate: {
          path: "users",
          select: "fullname phone_number profilePic",
          model: "User",
        },
      })
      .execPopulate();

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: populatedMessage,
    });

    res.json(populatedMessage);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { updateData } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      updateData,
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(deletedMessage);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
};
