const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");
const handleError = require("./shared/errors/handle");

dotenv.config();
const app = express();
// app use
app.use(express.json());
app.use(express.static("upload"));
app.use(cors());

// databaza
db();

// error handle
app.use(handleError);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishladi :)`);
});
