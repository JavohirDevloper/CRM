const { hashSync } = require("bcryptjs");

const teachers = [
  {
    email: "teacher@gmail.com",
    role: "teacher",
    password: hashSync("1234", 10),
  },
  {
    email: "javohir@gmail.com",
    role: "teacher",
    password: hashSync("1234", 10),
  },
  {
    email: "mirjalol@gmail.com",
    role: "teacher",
    password: hashSync("1234", 10),
  },
  {
    email: "baxriddin@gmail.com",
    role: "teacher",
    password: hashSync("1234", 10),
  },
];

module.exports = teachers;
