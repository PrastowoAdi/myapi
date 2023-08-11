const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const dailyRoute = require("./routes/daily");

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.use(cors({}));
app.use(express.json({ extended: false }));

app.use("/api/daily", dailyRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});
