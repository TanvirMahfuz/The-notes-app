require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./src/app");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running successfully");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
