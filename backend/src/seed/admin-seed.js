const { hashSync } = require("bcryptjs");

const admins = [
  {
    email: "kamron@gmail.com",
    role: "admin",
    password: hashSync("admin1234", 10),
  },
  {
    email: "admin@gmail.com",
    role: "admin",
    password: hashSync("admin1234", 10),
  },
  {
    email: "teacher@gmail.com",
    role: "teacher",
    password: hashSync("teacher1234", 10),
  },
  {
    email: "javohir@gmail.com",
    role: "teacher",
    password: hashSync("teacher1234", 10),
  },
];

module.exports = admins;
