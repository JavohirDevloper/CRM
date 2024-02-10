const { hashSync } = require("bcryptjs");

const admins = [
  {
    fullname: "Javohir",
    role: "admin",
    email: "muhammadiyevj768@gmail.com",
    password: hashSync("1234", 10),
  },
  {
    fullname: "admin",
    role: "admin",
    email: "admin@gmail.com",
    password: hashSync("1234", 10),
  },
  {
    fullname: "Jaxongir",
    role: "admin",
    email: "jaxongir@gmail.com",
    password: hashSync("1234", 10),
  },
];

module.exports = admins;
