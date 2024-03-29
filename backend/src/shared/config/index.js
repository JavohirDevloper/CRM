require("dotenv/config");

const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    fullname: process.env.DB_fullname,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirec_in: process.env.JWT_EXPIRES_IN,
  },
  salt: process.env.SALT,
};

module.exports = config;
