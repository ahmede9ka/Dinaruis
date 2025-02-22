const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // Loads environment variables
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE;

mongoose
  .connect(DB) // Removed deprecated options
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
