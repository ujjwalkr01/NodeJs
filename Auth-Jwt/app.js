const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config");

dotenv.config({ path: "./.env" });

const app = express();

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//parse url-encoded bodies (sent by Html forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //parses the incoming data with json

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.set("view engine", "hbs");

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
