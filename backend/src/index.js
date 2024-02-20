const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");
const useragent = require("express-useragent");
const path = require("path");
// user routerlari
const UserRouter = require("./routers/user.router");
const AdminRouter = require("./routers/admin.router");
const FileRouter = require("./routers/files.router");
const CoursesRouter = require("./routers/courses.router");
const TeacherRouter = require("./routers/teacher.router");
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
app.use(useragent.express());
// routes
app.use(UserRouter);
app.use(AdminRouter);
app.use(FileRouter);
app.use(CoursesRouter);
app.use(TeacherRouter);
// databaza
db();

// error handle
app.use(handleError);
//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});
