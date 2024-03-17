const { hashSync } = require("bcryptjs");

const admins = [
  {
    email: "admin@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "kamron@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "saidqodirxon@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "ayubxon@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
  {
    email: "turonbek@gmail.com",
    role: "super_admin",
    password: hashSync("1234", 10),
  },
  {
    email: "muhammadjon@gmail.com",
    role: "super_admin",
    password: hashSync("1234", 10),
  },
  {
    email: "mironshoh@gmail.com",
    role: "super_admin",
    password: hashSync("1234", 10),
  },
  {
    email: "superadmin@gmail.com",
    role: "super_admin",
    password: hashSync("1234", 10),
  },
];

module.exports = admins;
