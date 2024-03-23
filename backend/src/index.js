const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Server = require("socket.io");
const path = require("path");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");

// user routerlari
const UserEmailRouter = require("./routers/user.router");
const AdminRouter = require("./routers/admin.router");
const VideosRouter = require("./routers/videos.router");
const CoursesRouter = require("./routers/courses.router");
const TeacherRouter = require("./routers/teacher.router");
const NotificationRouter = require("./routers/notification.router");
const MessageRouter = require("./routers/message.router");
const ChatsRouter = require("./routers/chats.router");
dotenv.config();
const app = express();
// app use
app.use(express.json());
app.get("/videos/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "videos", req.params.filename));
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use(UserEmailRouter);
app.use(AdminRouter);
app.use(VideosRouter);
app.use(CoursesRouter);
app.use(TeacherRouter);
app.use(NotificationRouter);
app.use(MessageRouter);
app.use(ChatsRouter);
// databaza
db();

// error handle
app.use(handleError);
//port
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});

const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5000",
  },
});

const sockets = [];

io.on("connection", async (socket) => {
  try {
    let token = socket.request.headers.authorization;
    if (!token) {
      throw new Error("token not found");
      return;
    }

    socket.handshake.auth.token = token;

    let auth = jwt.verify(socket.handshake.auth.token, "hey");
    let exstingUser = await User.findById({ _id: auth.id });

    if (!exstingUser) {
      throw new Error("user not found bro");
      return;
    }

    exstingUser.password = "";
    exstingUser.status = "";

    socket.user = exstingUser;
    socket.handshake.auth.verficate = auth;
    sockets.push(socket);

    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected");
    });

    socket.on("join video", (video) => {
      socket.join(video);
    });

    socket.on("typing", (video) => socket.in(video).emit("typing"));
    socket.on("stop typing", (video) => socket.in(video).emit("stop typing"));

    socket.on("new file message", async (data) => {
      const { filename, message, chatId } = data;
      let msg = await messageModel.create({
        sender: socket.handshake.auth.verficate.id,
        message,
        chatId,
        filename: `/static/${filename}`,
      });

      msg = await (
        await msg.populate("sender", "fullname profilePic phone_number")
      ).populate({
        path: "chatId",
        select: "chatName isGroup users",
        model: "Chat",
        populate: {
          path: "users",
          select: "fullname phone_number profilePic",
          model: "User",
        },
      });
      await chatModel.findByIdAndUpdate(chatId, {
        latestMessage: msg,
      });
      if (msg) {
        msg.chatId.users.forEach((user) => {
          if (user._id == msg.sender._id) return;
          const receiverSocket = sockets.find(
            (socket) =>
              socket.handshake.auth.verficate.id == user._id && socket.connected
          );
          if (receiverSocket) {
            receiverSocket.emit("message recieved", { msg });
          }
        });
      }
    });

    socket.on("new message", async (data) => {
      const { message, chatId } = data;
      let msg = await messageModel.create({
        sender: socket.handshake.auth.verficate.id,
        message,
        chatId,
      });

      msg = await (
        await msg.populate("sender", "fullname profilePic phone_number")
      ).populate({
        path: "chatId",
        select: "chatName isGroup users",
        model: "Chat",
        populate: {
          path: "users",
          select: "fullname phone_number profilePic",
          model: "User",
        },
      });
      await chatModel.findByIdAndUpdate(chatId, {
        latestMessage: msg,
      });
      if (msg) {
        msg.chatId.users.forEach((user) => {
          if (user._id == msg.sender._id) return;
          const receiverSocket = sockets.find(
            (socket) =>
              socket.handshake.auth.verficate.id == user._id && socket.connected
          );
          if (receiverSocket) {
            receiverSocket.emit("new message recieved", { msg });
          }
        });
      }
    });
  } catch (error) {
    socket._error({ message: error.message });
    return;
  }
});
