const { hashSync } = require("bcryptjs");

const admins = [
  {
    email: "muhammadiyev@gmail.com",
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
    email: "javohir@gmail.com",
    role: "admin",
    password: hashSync("1234", 10),
  },
];

module.exports = admins;
