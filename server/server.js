require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const url = require("url");
const { error } = require("console");
const cookieParser = require("cookie-parser");
const Admin = require("./Models/admin-model.js");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    "Access-Control-Allow-Credentials": true,
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:8000" ||
      "http://localhost:3002" ||
      "localhost:8000",
    credentials: true,
  })
);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://localhost:3002",
    "localhost:8000",
    "localhost:3000",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
/*
try {
  // const db = mongoose.connect("mongodb://localhost:27017/Controller1");
  const db = mongoose.connect("mongodb://mongo:27017/Controller1");
  // const db = mongoose.connect(process.env.MONGO_URL);
  // const db = mongoose.connect("mongodb://localhost:27017/Controller1");
  console.log("Connected");
} catch (error) {
  handleError(error);
}*/
const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    console.log(process.env.DB_NAME);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    // Retry connection after a delay (e.g., 5 seconds)
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.use("/", require("./Routes/routes"));

async function ensureDefaultAdmin() {
  const password = "123456";

  const existingAdmin = await Admin.findOne({ username: "default" });

  if (!existingAdmin) {
    try {
      const defAdmin = new Admin({
        username: "default",
        password: password,
      });
      await defAdmin.save();
      console.log("Default admin created.");
    } catch (err) {
      console.error("Failed to create default admin:", err);
    }
  } else {
    console.log("Default admin already exists.");
  }
}


app.listen(process.env.SERVER_PORT, async() => {
  console.log("Server is running");
  console.log(process.env.SERVER_PORT);
  await ensureDefaultAdmin();
});

