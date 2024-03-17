const mongoose = require("mongoose");
const config = require("../../shared/config");

const Teacher = require("../../models/Teacher");
const TeacherSeed = require("./teacher-seed");

const seedData = async () => {
  const uri = process.env.DB;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("error", err);
    });

  const seedDB = async () => {
    await Teacher.deleteMany({});
    await Teacher.insertMany(TeacherSeed);
  };

  seedDB().then(() => {
    mongoose.connection.close();
  });
};

seedData();
