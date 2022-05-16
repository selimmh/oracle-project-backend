const express = require("express");

const port = process.env.PORT || 8080;
let app = express();
app.get("/", (req, res) => {
  res.send("oh hi ¯\_(ツ)_/¯ v1.0.3");
});
app.use(express.json());
app.listen(port);

module.exports = app;