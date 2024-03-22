const { chatModel } = require("../models/Chats");
const { User } = require("../models/User");

const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const chatExists = await chatModel.findOne({
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: req.user.id } } },
      ],
    });

    if (chatExists) {
      return res.status(409).json({ message: "Chat already exists" });
    }

    const data = {
      chatName: "sender",
      users: [userId, req.user.id],
      isGroup: false,
    };

    const newChat = await chatModel.create(data);
    const chat = await chatModel
      .findById(newChat._id)
      .populate({ path: "users" })
      .exec();

    return res.status(201).json(chat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.user.id } },
      })
      .populate([
        { path: "users" },
        { path: "latestMessage" },
        { path: "groupAdmin" },
      ]);

    const finalChats = await User.populate(chats, [
      { path: "latestMessage.sender" },
    ]);

    return res.json(finalChats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const updateData = req.body;

    const updatedChat = await chatModel.findByIdAndUpdate(chatId, updateData, {
      new: true,
    });

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.json(updatedChat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const deletedChat = await chatModel.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.status(200).json(deletedChat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  updateChat,
  deleteChat,
};
