const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");

// user routerlari
const UserRouter = require("./routers/user.router");
const AdminRouter = require("./routers/admin.router");
const FileRouter = require("./routers/files.router");
const CoursesRouter = require("./routers/courses.router");
dotenv.config();
const app = express();
// app use
app.use(express.json());
app.use(express.static("videos"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use(UserRouter);
app.use(AdminRouter);
app.use(FileRouter);
app.use(CoursesRouter);
// databaza
db();

// error handle
app.use(handleError);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});
