require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const listRoutes = require("./routes/list");

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("========");
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/list", listRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening for requests
    app.listen(process.env.PORT, () => {
      console.log("=============");
      console.log(
        "Connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log("==========");
    console.log(error);
  });
