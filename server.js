const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Routes
const user = require("./route/api/user");
const items = require("./route/api/items");

// Middleware
app.use(express.json());

// Connect to mongoDB
mongoose
  .connect(
    config.get("mongoURI"),
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log("MongoDB connecting with errors" + err);
    }
  )
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(`Connecting mongoDB with errors: ${err}`);
  });

// PORT
const PORT = process.env.PORT || 5000;

// Setting routes
app.use("/api/user", user);
app.use("/api/items", items);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
