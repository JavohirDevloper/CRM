const { hashSync } = require("bcryptjs");

const admins = [
  {
    email: "kamron@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "admin@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "jaxongir@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "ayubxon@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
];

module.exports = admins;
