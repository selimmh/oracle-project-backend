const express = require("express");
const cors = require('cors')
const port = process.env.PORT || 3001;
let app = express();
app.get("/", (req, res) => {
  res.send("oh hi ¯\_(ツ)_/¯ v1.0.7");
});
app.use(express.json());
app.use(cors())
app.listen(port);

module.exports = app;