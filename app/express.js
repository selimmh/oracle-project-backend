const express = require("express");

const port = process.env.PORT || 8080;
let app = express();
app.get("/", (req, res) => {
  res.send("3.14159265359");
});
app.use(express.json());
app.listen(port);

module.exports = app;