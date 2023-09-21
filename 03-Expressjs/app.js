const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hellog from the server side!", app: "Travelling_Blogs" });
});

app.post("/", (req, res) => {
  res.status(404).send("You can post to this endpoint...");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
