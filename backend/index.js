const mongoose = require("mongoose");
const app = require("./src/app");

mongoose
  .connect("mongodb://localhost:27017/TheNotesApp")
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running successfully");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
