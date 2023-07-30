const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);
const port = process.env.PORT || 5000;

  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

app.listen(port, () => console.log(`Node Js Server started at ${port}!`));
